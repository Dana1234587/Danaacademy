
// This service will handle all Firestore operations related to students
import { collection, getDocs, addDoc, query, where, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';
import { deleteRegisteredDeviceByStudentId } from './deviceService';


export type Student = {
  id: string; // This will be the Firebase Auth UID
  studentName: string;
  username: string;
  password?: string; // Password will be stored in Firestore but is optional on the type
  courses: string[];
  courseIds: string[];
  phone1?: string;
  phone2?: string;
};

export async function getStudents(): Promise<Student[]> {
  const studentsCol = collection(db, 'students');
  const studentSnapshot = await getDocs(studentsCol);
  const studentList = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Student));
  return studentList;
}

export async function addStudent(studentData: Omit<Student, 'id'>): Promise<Student> {
    if (!studentData.password) {
        throw new Error("Password is required to create a student.");
    }

    // Firebase auth requires an email format. We'll append a dummy domain.
    const email = `${studentData.username}@dana-academy.com`;

    // 1. Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, studentData.password);
    const user = userCredential.user;

    // 2. Create student document in Firestore with the UID from Auth as the document ID
    const studentDocRef = doc(db, 'students', user.uid);
    
    // Create a new object for Firestore that includes the password and other details
    const firestoreData = {
        studentName: studentData.studentName,
        username: studentData.username,
        password: studentData.password, // Storing password in plaintext as requested
        courses: studentData.courses,
        courseIds: studentData.courseIds,
        phone1: studentData.phone1 || '',
        phone2: studentData.phone2 || '',
    };
    
    await setDoc(studentDocRef, firestoreData);

    const newStudent: Student = {
        id: user.uid,
        ...firestoreData
    };
    
    return newStudent;
}


export async function findStudentByUsername(username: string): Promise<Student | undefined> {
    const q = query(collection(db, "students"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
        return undefined;
    }

    const studentDoc = querySnapshot.docs[0];
    return { id: studentDoc.id, ...studentDoc.data() } as Student;
}

export async function deleteStudent(studentId: string): Promise<void> {
    // This action only deletes from Firestore and the associated devices.
    // The Auth user must be deleted manually from the Firebase Console.
    // This is a security measure as frontend clients typically don't have privileges to delete users.
    console.warn(`Deleting student ${studentId} from Firestore. Associated Auth user must be deleted manually.`);
    
    await deleteDoc(doc(db, "students", studentId));
    await deleteRegisteredDeviceByStudentId(studentId);
}

export async function updateStudent(studentId: string, data: Partial<Omit<Student, 'id' | 'password'>>): Promise<void> {
    const studentRef = doc(db, "students", studentId);
    await setDoc(studentRef, data, { merge: true });
}

export async function resetStudentPassword(studentId: string, newPassword: string):Promise<void> {
    // This function only updates the password in the Firestore database for display purposes.
    // It does NOT change the user's actual login password in Firebase Authentication.
    // Changing Auth passwords requires the user to be signed in or a privileged backend environment.
    const studentRef = doc(db, "students", studentId);
    await updateDoc(studentRef, {
        password: newPassword
    });
    console.log(`Password for student ${studentId} updated in Firestore. This does NOT change their actual login password.`);
}
