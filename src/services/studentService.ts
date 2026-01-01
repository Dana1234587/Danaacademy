
'use server';

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

// Lazy accessor to avoid initialization at module load time
function getStudentsCol() {
    return adminDB.collection('students');
}

export async function getStudents(): Promise<Student[]> {
    const studentSnapshot = await getStudentsCol().orderBy('studentName').get();
    const studentList = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Student));
    return studentList;
}

export async function addStudent(studentData: Omit<Student, 'id'> & { id: string }): Promise<void> {
    const { id, password, ...firestoreData } = studentData; // Exclude password from Firestore data
    const studentDocRef = getStudentsCol().doc(id);

    const dataToStore: any = { ...firestoreData };
    if (password) {
        dataToStore.password = password;
    }

    await studentDocRef.set(dataToStore);
}

export async function findStudentByUsername(username: string): Promise<Student | undefined> {
    const q = getStudentsCol().where("username", "==", username);
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

    const studentRef = getStudentsCol().doc(studentId);
    batch.delete(studentRef);

    const registeredDevicesQuery = adminDB.collection("registeredDevices").where("studentId", "==", studentId);
    const registeredDevicesSnapshot = await registeredDevicesQuery.get();
    registeredDevicesSnapshot.forEach(doc => {
        batch.delete(doc.ref);
    });

    const pendingDevicesQuery = adminDB.collection("pendingDevices").where("studentId", "==", studentId);
    const pendingDevicesSnapshot = await pendingDevicesQuery.get();
    pendingDevicesSnapshot.forEach(doc => {
        batch.delete(doc.ref);
    });

    await batch.commit();

    try {
        await adminAuth.deleteUser(studentId);
    } catch (error) {
        console.error(`Failed to delete user ${studentId} from Auth:`, error);
        // We still proceed even if auth deletion fails, as the user is already removed from our DBs
    }
}

export async function updateStudent(studentId: string, data: Partial<Omit<Student, 'id' | 'password'>>): Promise<void> {
    const studentRef = getStudentsCol().doc(studentId);
    await studentRef.update(data);
}

export async function resetStudentPassword(studentId: string, newPassword: string): Promise<void> {
    const studentRef = getStudentsCol().doc(studentId);
    await studentRef.update({
        password: newPassword
    });

    await adminAuth.updateUser(studentId, {
        password: newPassword
    });
}
