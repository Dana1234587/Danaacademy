// الدورات المتاحة
export const availableCourses = [
    { id: 'tawjihi-2007-supplementary', name: 'فيزياء تكميلي 2007' },
    { id: 'tawjihi-2008-first-semester', name: 'فيزياء توجيهي 2008 - فصل أول' },
    { id: 'tawjihi-2008-foundation', name: 'دورة التأسيس توجيهي 2008' },
    { id: 'tawjihi-2008-palestine', name: 'فيزياء التوجيهي - فلسطين 2008' },
    { id: 'astrophysics', name: 'فيزياء الثاني عشر - قطر' },
    { id: 'physics-101', name: 'فيزياء الجامعة 101' },
];

export type Course = typeof availableCourses[number];
