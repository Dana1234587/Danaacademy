// Portal types for DanaAcademy free learning section

export interface Portal {
    id: string;
    name: string;
    nameAr: string;
    description: string;
    descriptionAr: string;
    icon: string;
    color: string;
    gradient: string;
    href: string;
    requiresAuth: boolean;
}

export const portals: Portal[] = [
    {
        id: 'learn',
        name: 'Lessons & Formulas',
        nameAr: 'الشرح والقوانين',
        description: 'Detailed explanations and formula summaries',
        descriptionAr: 'شرح مفصل للدروس وتلخيص القوانين',
        icon: '📖',
        color: 'blue',
        gradient: 'from-blue-500 to-cyan-500',
        href: '/learn',
        requiresAuth: false
    },
    {
        id: 'simulations',
        name: 'Physics Simulations',
        nameAr: 'برامج المحاكاة',
        description: 'Interactive physics experiments and visualizations',
        descriptionAr: 'تجارب فيزيائية تفاعلية ومحاكاة ثلاثية الأبعاد',
        icon: '🔬',
        color: 'purple',
        gradient: 'from-purple-500 to-pink-500',
        href: '/simulations',
        requiresAuth: false
    },
    {
        id: 'games',
        name: 'Learning Games',
        nameAr: 'ألعاب تعليمية',
        description: 'Learn physics through fun interactive games',
        descriptionAr: 'تعلم الفيزياء عن طريق ألعاب ممتعة وتفاعلية',
        icon: '🎮',
        color: 'green',
        gradient: 'from-green-500 to-emerald-500',
        href: '/games',
        requiresAuth: false
    },
    {
        id: 'exams-archive',
        name: 'Past Exams',
        nameAr: 'أسئلة وزارية',
        description: 'Download past ministerial exam papers',
        descriptionAr: 'تحميل أسئلة السنوات السابقة الوزارية',
        icon: '📝',
        color: 'orange',
        gradient: 'from-orange-500 to-amber-500',
        href: '/exams-archive',
        requiresAuth: false
    },
    {
        id: 'books',
        name: 'Textbooks',
        nameAr: 'تحميل الكتب',
        description: 'Download textbooks and study materials',
        descriptionAr: 'تحميل الكتب المدرسية والمراجع',
        icon: '📕',
        color: 'red',
        gradient: 'from-red-500 to-rose-500',
        href: '/books',
        requiresAuth: false
    }
];

export function getPortalById(portalId: string): Portal | undefined {
    return portals.find(p => p.id === portalId);
}
