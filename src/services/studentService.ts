import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, query, where, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

// This type now includes the student's UID from Auth
export type NewStudentData = Omit<Student, 'id'> & { uid: string };

const REGISTRATION_SECRET_KEY = "DANA_ACADEMY_VERY_SECRET_KEY";

export async function getStudents(): Promise<Student[]> {
  const studentsCol = collection(db, 'students');
  const studentSnapshot = await getDocs(studentsCol);
  const studentList = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Student));
  return studentList;
}

// The student creation logic is now split. Auth creation is in the component.
// This function is only for adding the student data to Firestore.
export async function addStudent(studentData: Student): Promise<void> {
    const { id, ...firestoreData } = studentData;
    const studentDocRef = doc(db, 'students', id);
    await setDoc(studentDocRef, firestoreData);
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
    console.warn(`Deleting student ${studentId} from Firestore. Associated Auth user must be deleted manually.`);
    
    const batch = writeBatch(db);

    const studentRef = doc(db, "students", studentId);
    batch.delete(studentRef);

    const registeredDevicesQuery = query(collection(db, "registeredDevices"), where("studentId", "==", studentId));
    const registeredDevicesSnapshot = await getDocs(registeredDevicesQuery);
    registeredDevicesSnapshot.forEach(doc => {
        batch.delete(doc.ref);
    });
    
    await batch.commit();
}

export async function updateStudent(studentId: string, data: Partial<Omit<Student, 'id' | 'password'>>): Promise<void> {
    const studentRef = doc(db, "students", studentId);
    await setDoc(studentRef, data, { merge: true });
}

export async function resetStudentPassword(studentId: string, newPassword: string):Promise<void> {
    const studentRef = doc(db, "students", studentId);
    await updateDoc(studentRef, {
        password: newPassword
    });
    console.warn(`Password for student ${studentId} updated in Firestore. This does NOT change their actual login password.`);
}
