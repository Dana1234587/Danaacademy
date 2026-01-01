// Countries and curricula data for Dana Academy

export interface Country {
    id: string;
    name: string;
    nameAr: string;
    flag: string;
    grades: Grade[];
}

export interface Grade {
    id: string;
    name: string;
    nameAr: string;
    semesters: Semester[];
}

export interface Semester {
    id: string;
    name: string;
    nameAr: string;
    units: Unit[];
}

export interface Unit {
    id: string;
    number: number;
    name: string;
    nameAr: string;
    description: string;
    descriptionAr: string;
    lessonsCount: number;
    icon: string;
}

export interface Lesson {
    id: string;
    unitId: string;
    number: number;
    title: string;
    titleAr: string;
    content: string;
    formulas: Formula[];
    examples: Example[];
}

export interface Formula {
    id: string;
    name: string;
    nameAr: string;
    latex: string;
    description: string;
    descriptionAr: string;
}

export interface Example {
    id: string;
    question: string;
    questionAr: string;
    solution: string;
    solutionAr: string;
}

// Countries Data
export const countries: Country[] = [
    {
        id: 'jordan',
        name: 'Jordan',
        nameAr: 'الأردن',
        flag: '🇯🇴',
        grades: [
            {
                id: 'tawjihi-2008',
                name: 'Tawjihi 2008',
                nameAr: 'توجيهي 2008',
                semesters: [
                    {
                        id: 'semester-1',
                        name: 'First Semester',
                        nameAr: 'الفصل الأول',
                        units: [
                            {
                                id: 'momentum',
                                number: 1,
                                name: 'Momentum',
                                nameAr: 'الزخم',
                                description: 'Linear momentum, conservation of momentum, collisions',
                                descriptionAr: 'الزخم الخطي، حفظ الزخم، التصادمات',
                                lessonsCount: 8,
                                icon: '🎯'
                            },
                            {
                                id: 'work-energy',
                                number: 2,
                                name: 'Work and Energy',
                                nameAr: 'الشغل والطاقة',
                                description: 'Work, kinetic energy, potential energy, power',
                                descriptionAr: 'الشغل، الطاقة الحركية، طاقة الوضع، القدرة',
                                lessonsCount: 10,
                                icon: '⚡'
                            },
                            {
                                id: 'rotational-motion',
                                number: 3,
                                name: 'Rotational Motion',
                                nameAr: 'الحركة الدورانية',
                                description: 'Torque, moment of inertia, angular momentum',
                                descriptionAr: 'العزم، القصور الذاتي، الزخم الزاوي',
                                lessonsCount: 9,
                                icon: '🔄'
                            },
                            {
                                id: 'equilibrium-elasticity',
                                number: 4,
                                name: 'Equilibrium and Elasticity',
                                nameAr: 'التوازن والمرونة',
                                description: 'Equilibrium conditions, elasticity, stress and strain',
                                descriptionAr: 'شروط التوازن، المرونة، الإجهاد والانفعال',
                                lessonsCount: 7,
                                icon: '⚖️'
                            }
                        ]
                    },
                    {
                        id: 'semester-2',
                        name: 'Second Semester',
                        nameAr: 'الفصل الثاني',
                        units: [] // To be filled later
                    }
                ]
            },
            {
                id: 'tawjihi-2007',
                name: 'Tawjihi 2007 (Supplementary)',
                nameAr: 'توجيهي 2007 (التكميلي)',
                semesters: [
                    {
                        id: 'semester-1',
                        name: 'First Semester',
                        nameAr: 'الفصل الأول',
                        units: []
                    },
                    {
                        id: 'semester-2',
                        name: 'Second Semester',
                        nameAr: 'الفصل الثاني',
                        units: []
                    }
                ]
            },
            {
                id: 'first-secondary',
                name: 'First Secondary',
                nameAr: 'أول ثانوي',
                semesters: [
                    {
                        id: 'semester-1',
                        name: 'First Semester',
                        nameAr: 'الفصل الأول',
                        units: []
                    },
                    {
                        id: 'semester-2',
                        name: 'Second Semester',
                        nameAr: 'الفصل الثاني',
                        units: []
                    }
                ]
            }
        ]
    },
    {
        id: 'palestine',
        name: 'Palestine',
        nameAr: 'فلسطين',
        flag: '🇵🇸',
        grades: [
            {
                id: 'tawjihi',
                name: 'Tawjihi',
                nameAr: 'توجيهي',
                semesters: [
                    {
                        id: 'semester-1',
                        name: 'First Semester',
                        nameAr: 'الفصل الأول',
                        units: []
                    },
                    {
                        id: 'semester-2',
                        name: 'Second Semester',
                        nameAr: 'الفصل الثاني',
                        units: []
                    }
                ]
            }
        ]
    },
    {
        id: 'qatar',
        name: 'Qatar',
        nameAr: 'قطر',
        flag: '🇶🇦',
        grades: [
            {
                id: 'grade-12-scientific',
                name: '12th Grade Scientific',
                nameAr: 'الثاني عشر علمي',
                semesters: [
                    {
                        id: 'semester-1',
                        name: 'First Semester',
                        nameAr: 'الفصل الأول',
                        units: []
                    },
                    {
                        id: 'semester-2',
                        name: 'Second Semester',
                        nameAr: 'الفصل الثاني',
                        units: []
                    }
                ]
            }
        ]
    },
    {
        id: 'uae',
        name: 'UAE',
        nameAr: 'الإمارات',
        flag: '🇦🇪',
        grades: [
            {
                id: 'grade-12',
                name: '12th Grade',
                nameAr: 'الثاني عشر',
                semesters: [
                    {
                        id: 'semester-1',
                        name: 'First Semester',
                        nameAr: 'الفصل الأول',
                        units: []
                    },
                    {
                        id: 'semester-2',
                        name: 'Second Semester',
                        nameAr: 'الفصل الثاني',
                        units: []
                    }
                ]
            },
            {
                id: 'first-secondary',
                name: 'First Secondary',
                nameAr: 'أول ثانوي',
                semesters: [
                    {
                        id: 'semester-1',
                        name: 'First Semester',
                        nameAr: 'الفصل الأول',
                        units: []
                    },
                    {
                        id: 'semester-2',
                        name: 'Second Semester',
                        nameAr: 'الفصل الثاني',
                        units: []
                    }
                ]
            }
        ]
    }
];

// Helper functions
export function getCountryById(countryId: string): Country | undefined {
    return countries.find(c => c.id === countryId);
}

export function getGradeById(countryId: string, gradeId: string): Grade | undefined {
    const country = getCountryById(countryId);
    return country?.grades.find(g => g.id === gradeId);
}

export function getSemesterById(countryId: string, gradeId: string, semesterId: string): Semester | undefined {
    const grade = getGradeById(countryId, gradeId);
    return grade?.semesters.find(s => s.id === semesterId);
}

export function getUnitById(countryId: string, gradeId: string, semesterId: string, unitId: string): Unit | undefined {
    const semester = getSemesterById(countryId, gradeId, semesterId);
    return semester?.units.find(u => u.id === unitId);
}
