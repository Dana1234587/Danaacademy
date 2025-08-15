'use server';

import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, query, where, writeBatch } from 'firebase/firestore';
// The client-side db is not needed here anymore as all admin operations should use adminDB
// import { db } from '@/lib/firebase'; 
import { adminDB, adminAuth } from '@/lib/firebase-admin';

export type Student = {
  id: string; // This will be the Firebase Auth UID
  studentName: string;
  username: string;
  password?: string; // Password will be stored in Firestore but is optional on the type
  email: string;
  courses: string[];
  courseIds: string[];
  phone1?: string;
  phone2?: string;
};

// We use adminDB for all server-side data fetching for the admin panel.
const studentsCol = adminDB.collection('students');

export async function getStudents(): Promise<Student[]> {
  const studentSnapshot = await studentsCol.get();
  const studentList = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Student));
  return studentList;
}

// This function now only adds the student data to Firestore, assuming auth is created elsewhere.
export async function addStudent(studentData: Student): Promise<void> {
    const { id, ...firestoreData } = studentData; // Separate the id from the rest of the data
    const studentDocRef = adminDB.collection('students').doc(id); // Use the auth UID as the document ID
    await studentDocRef.set(firestoreData);
}

export async function findStudentByUsername(username: string): Promise<Student | undefined> {
    const q = studentsCol.where("username", "==", username);
    const querySnapshot = await q.get();
    
    if (querySnapshot.empty) {
        return undefined;
    }

    const studentDoc = querySnapshot.docs[0];
    return { id: studentDoc.id, ...studentDoc.data() } as Student;
}

export async function deleteStudent(studentId: string): Promise<void> {
    console.warn(`Deleting student ${studentId} from Firestore and Auth.`);
    
    const batch = adminDB.batch();

    const studentRef = adminDB.collection("students").doc(studentId);
    batch.delete(studentRef);

    const registeredDevicesQuery = adminDB.collection("registeredDevices").where("studentId", "==", studentId);
    const registeredDevicesSnapshot = await registeredDevicesQuery.get();
    registeredDevicesSnapshot.forEach(doc => {
        batch.delete(doc.ref);
    });
    
    await batch.commit();

    // Also delete the user from Firebase Auth
    try {
        await adminAuth.deleteUser(studentId);
    } catch(error) {
        console.error(`Failed to delete user ${studentId} from Auth:`, error);
        // We might want to decide if we throw an error here or just log it
    }
}

export async function updateStudent(studentId: string, data: Partial<Omit<Student, 'id' | 'password'>>): Promise<void> {
    const studentRef = adminDB.collection("students").doc(studentId);
    await studentRef.update(data);
}

export async function resetStudentPassword(studentId: string, newPassword: string):Promise<void> {
    const studentRef = adminDB.collection("students").doc(studentId);
    // This updates the password in Firestore for display/recovery purposes
    await studentRef.update({
        password: newPassword
    });

    // This updates the actual password in Firebase Authentication
    await adminAuth.updateUser(studentId, {
        password: newPassword
    });
}
