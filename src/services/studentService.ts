
// This service will handle all Firestore operations related to students
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, query, where, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
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

type NewStudentData = Omit<Student, 'id'>

export async function getStudents(): Promise<Student[]> {
  const studentsCol = collection(db, 'students');
  const studentSnapshot = await getDocs(studentsCol);
  const studentList = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Student));
  return studentList;
}

export async function addStudent(uid: string, studentData: NewStudentData): Promise<void> {
    const studentDocRef = doc(db, 'students', uid);
    await setDoc(studentDocRef, studentData);
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
    console.warn(`Password for student ${studentId} updated in Firestore. This does NOT change their actual login password.`);
}
