// This service will handle all Firestore operations related to students
import { collection, getDocs, addDoc, query, where, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';


export type Student = {
  id: string; // This will be the Firebase Auth UID
  studentName: string;
  username: string;
  password?: string; // Password is for creation, not for storage in Firestore
  course: string;
  courseId: string;
};

// Mock data to simulate Firestore - WE ARE NOW USING FIRESTORE
// let students: Student[] = [
//     { id: 's1', studentName: 'أحمد علي', username: 'ahmad.ali', password: 'password123', course: 'فيزياء تكميلي 2007', courseId: 'tawjihi-2007-supplementary' },
//     { id: 's2', studentName: 'فاطمة محمد', username: 'fatima.mohd', password: 'password123', course: 'فيزياء توجيهي 2008', courseId: 'tawjihi-2008' },
//     { id: 's3', studentName: 'خالد يوسف', username: 'khaled.yousef', password: 'password123', course: 'فيزياء توجيهي 2008', courseId: 'tawjihi-2008' },
// ];

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
    
    // We don't store the password in Firestore
    const { password, ...studentDataForFirestore } = studentData;
    
    await setDoc(studentDocRef, studentDataForFirestore);

    const newStudent: Student = {
        id: user.uid,
        ...studentDataForFirestore
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

// Functions for editing and deleting students can be added here
export async function deleteStudent(studentId: string): Promise<void> {
    // This is a more complex operation. Deleting a user from Auth is a privileged
    // action and should be handled by a backend function (e.g., Firebase Cloud Function)
    // for security reasons. For now, we will only delete from Firestore.
    await deleteDoc(doc(db, "students", studentId));
    
    // Also delete their registered device if it exists
    // This requires another service call, or expanding this one.
}

export async function updateStudent(studentId: string, data: Partial<Omit<Student, 'id' | 'password'>>): Promise<void> {
    const studentRef = doc(db, "students", studentId);
    await setDoc(studentRef, data, { merge: true });
}
