// الدورات المتاحة - IDs تتطابق مع folder names في /courses/
export const availableCourses = [
    { id: 'physics-supplementary-2007', name: 'فيزياء تكميلي 2007' },
    { id: 'physics-2008', name: 'فيزياء توجيهي 2008 - فصل أول' },
    { id: 'physics-2008-foundation', name: 'دورة التأسيس توجيهي 2008' },
    { id: 'physics-2008-palestine', name: 'فيزياء التوجيهي - فلسطين 2008' },
    { id: 'astrophysics', name: 'فيزياء الثاني عشر - قطر' },
    { id: 'physics-101', name: 'فيزياء الجامعة 101' },
];

export type Course = typeof availableCourses[number];
