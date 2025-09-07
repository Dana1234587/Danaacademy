
'use server';

import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, query, where, writeBatch } from 'firebase/firestore';
import { adminDB, adminAuth } from '@/lib/firebase-admin';

export type Student = {
  id: string; 
  studentName: string;
  username: string;
  password?: string; 
  email: string;
  courses: string[];
  courseIds: string[];
  phone1?: string;
  phone2?: string;
  gender?: 'male' | 'female';
};

const studentsCol = adminDB.collection('students');

export async function getStudents(): Promise<Student[]> {
  const studentSnapshot = await studentsCol.orderBy('studentName').get();
  const studentList = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Student));
  return studentList;
}

export async function addStudent(studentData: Omit<Student, 'id'> & { id: string }): Promise<void> {
    const { id, ...firestoreData } = studentData;
    const studentDocRef = doc(adminDB, 'students', id);
    await setDoc(studentDocRef, firestoreData);
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
    
    const batch = writeBatch(adminDB);

    const studentRef = doc(adminDB, "students", studentId);
    batch.delete(studentRef);

    const registeredDevicesQuery = adminDB.collection("registeredDevices").where("studentId", "==", studentId);
    const registeredDevicesSnapshot = await getDocs(registeredDevicesQuery);
    registeredDevicesSnapshot.forEach(doc => {
        batch.delete(doc.ref);
    });
    
    await batch.commit();

    try {
        await adminAuth.deleteUser(studentId);
    } catch(error) {
        console.error(`Failed to delete user ${studentId} from Auth:`, error);
    }
}

export async function updateStudent(studentId: string, data: Partial<Omit<Student, 'id' | 'password'>>): Promise<void> {
    const studentRef = doc(adminDB, "students", studentId);
    // The data passed in here should not contain 'password'.
    // The type definition enforces this.
    await updateDoc(studentRef, data);
}


export async function resetStudentPassword(studentId: string, newPassword: string):Promise<void> {
    const studentRef = doc(adminDB, "students", studentId);
    // Only update the password field in firestore if it exists
    await updateDoc(studentRef, {
        password: newPassword
    });

    await adminAuth.updateUser(studentId, {
        password: newPassword
    });
}
