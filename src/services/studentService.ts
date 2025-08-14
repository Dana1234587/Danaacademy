// This service will handle all Firestore operations related to students
// For now, we will use mock data, but this is where we would add Firebase logic.

export type Student = {
  id: string;
  studentName: string;
  username: string;
  password: string;
  course: string;
  courseId: string;
};

// Mock data to simulate Firestore
let students: Student[] = [
    { id: 's1', studentName: 'أحمد علي', username: 'ahmad.ali', password: 'password123', course: 'فيزياء تكميلي 2007', courseId: 'tawjihi-2007-supplementary' },
    { id: 's2', studentName: 'فاطمة محمد', username: 'fatima.mohd', password: 'password123', course: 'فيزياء توجيهي 2008', courseId: 'tawjihi-2008' },
    { id: 's3', studentName: 'خالد يوسف', username: 'khaled.yousef', password: 'password123', course: 'فيزياء توجيهي 2008', courseId: 'tawjihi-2008' },
];

export async function getStudents(): Promise<Student[]> {
  // In the future, this will fetch from Firestore
  return Promise.resolve(students);
}

export async function addStudent(studentData: Omit<Student, 'id'>): Promise<Student> {
  const newStudent: Student = {
    id: `s${students.length + 1}`,
    ...studentData
  };
  students.push(newStudent);
  return Promise.resolve(newStudent);
}

export async function findStudentByUsername(username: string): Promise<Student | undefined> {
    return Promise.resolve(students.find(s => s.username === username));
}
