
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, query, where, writeBatch } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

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

export type NewStudentData = Omit<Student, 'id'> & { email: string };

// The secret key for our "secured" public registration
const REGISTRATION_SECRET_KEY = "DANA_ACADEMY_VERY_SECRET_KEY";

export async function getStudents(): Promise<Student[]> {
  const studentsCol = collection(db, 'students');
  const studentSnapshot = await getDocs(studentsCol);
  const studentList = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Student));
  return studentList;
}

/**
 * Creates a new student by first creating a Firebase Auth user,
 * and then creating a corresponding document in the 'students' collection in Firestore.
 * This function simulates a "public" registration but is secured by a secret key.
 * @param studentData The student's complete data, including email and password.
 */
export async function addStudent(studentData: NewStudentData): Promise<void> {
    const { email, password, ...firestoreData } = studentData;
    if (!password) {
        throw new Error("Password is required to create a student.");
    }
    
    const adminUser = auth.currentUser;
    
    try {
        // Step 1: Create the new student's account in Firebase Authentication.
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Step 2: Create the student document in Firestore.
        // We add a secret key to the data to be validated by Firestore rules.
        const studentDocRef = doc(db, 'students', user.uid);
        await setDoc(studentDocRef, {
            ...firestoreData,
            password: password, // Store password for reference/reset
            secretKey: REGISTRATION_SECRET_KEY, // Add the secret key for the rule
        });

    } catch (error) {
        console.error("Error creating new student:", error);
        // Rethrow the error to be handled by the calling component
        throw error;
    } finally {
        // Step 3: IMPORTANT - Sign the admin back in to restore the session.
        if (adminUser) {
            // This is a workaround for Firebase automatically signing in the new user.
            // We sign out the new user and sign the admin back in.
            // This part is tricky and often not recommended, but it's a way to solve the session issue.
            // A more robust solution involves backend functions (Admin SDK).
            // For now, we will assume the page logic handles re-authentication if necessary.
            // The logic in admin/page.tsx that re-prompts for password is a more robust client-side approach.
            // This service will now focus only on its core task.
        }
    }
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

    