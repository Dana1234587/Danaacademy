
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
    const { id, password, ...firestoreData } = studentData; // Exclude password from Firestore data
    const studentDocRef = doc(adminDB, 'students', id);
    
    // Create a new object for Firestore that includes the password if you decide to store it
    const dataToStore: any = { ...firestoreData };
    if (password) {
        dataToStore.password = password; // Only add password if it exists
    }
    
    await setDoc(studentDocRef, dataToStore);
}


export async function findStudentByUsername(username: string): Promise<Student | undefined> {
    const q = query(studentsCol, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    
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

    const registeredDevicesQuery = query(adminDB.collection("registeredDevices"), where("studentId", "==", studentId));
    const registeredDevicesSnapshot = await getDocs(registeredDevicesQuery);
    registeredDevicesSnapshot.forEach(doc => {
        batch.delete(doc.ref);
    });
    
    const pendingDevicesQuery = query(adminDB.collection("pendingDevices"), where("studentId", "==", studentId));
    const pendingDevicesSnapshot = await getDocs(pendingDevicesQuery);
    pendingDevicesSnapshot.forEach(doc => {
        batch.delete(doc.ref);
    });
    
    await batch.commit();

    try {
        await adminAuth.deleteUser(studentId);
    } catch(error) {
        console.error(`Failed to delete user ${studentId} from Auth:`, error);
        // We still proceed even if auth deletion fails, as the user is already removed from our DBs
    }
}

export async function updateStudent(studentId: string, data: Partial<Omit<Student, 'id' | 'password'>>): Promise<void> {
    const studentRef = doc(adminDB, "students", studentId);
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
