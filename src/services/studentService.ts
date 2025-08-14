// This service will handle all Firestore operations related to students
import { collection, getDocs, addDoc, query, where, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';
import { deleteRegisteredDeviceByStudentId } from './deviceService';


export type Student = {
  id: string; // This will be the Firebase Auth UID
  studentName: string;
  username: string;
  password?: string; // Password is for creation, not for storage in Firestore
  course: string;
  courseId: string;
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
    
    // We now store the password in Firestore as requested by the user
    await setDoc(studentDocRef, studentData);

    const newStudent: Student = {
        id: user.uid,
        ...studentData
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
    // This is a complex operation. Deleting a user from Auth is a privileged
    // action and should ideally be handled by a backend function (e.g., Firebase Cloud Function)
    // for security reasons. For this internal admin panel, we will assume the admin is authenticated
    // and proceed, but this is not recommended for production apps without a secure backend.
    
    // For now, we will only delete from Firestore and the associated devices.
    await deleteDoc(doc(db, "students", studentId));
    await deleteRegisteredDeviceByStudentId(studentId);

    // To properly delete from auth, we would need to implement a cloud function.
    // The front-end does not have the privileges to delete other users.
    console.log(`Student ${studentId} deleted from Firestore. Auth user must be deleted manually or via a Cloud Function.`);
}

export async function updateStudent(studentId: string, data: Partial<Omit<Student, 'id'>>): Promise<void> {
    const studentRef = doc(db, "students", studentId);
    await setDoc(studentRef, data, { merge: true });
}

export async function resetStudentPassword(studentId: string, newPassword: string):Promise<void> {
    // This also ideally requires a backend function to update a user's password directly.
    // The client-side SDK cannot directly set a new password for another user.
    // As a workaround for this admin panel, we will just update the password stored in Firestore.
    // The actual login password in Firebase Auth will NOT be changed. The user will have to
    // be deleted and re-created to have a new password.
    // A better approach is sending a password reset email.
    await updateStudent(studentId, { password: newPassword });
    console.log(`Password for student ${studentId} updated in Firestore. Auth password is unchanged.`);
}
