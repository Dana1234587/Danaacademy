'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Loader2 } from 'lucide-react';
import { availableCourses } from '../constants';

interface CreateStudentTabProps {
    onCreateAccount: (
        studentName: string,
        username: string,
        password: string,
        phone1: string,
        phone2: string,
        gender: 'male' | 'female',
        selectedCourses: string[]
    ) => Promise<boolean>;
    isLoading: boolean;
}

export function CreateStudentTab({ onCreateAccount, isLoading }: CreateStudentTabProps) {
    const [studentName, setStudentName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await onCreateAccount(studentName, username, password, phone1, phone2, gender, selectedCourses);
        if (success) {
            // Clear form
            setStudentName('');
            setUsername('');
            setPassword('');
            setPhone1('');
            setPhone2('');
            setSelectedCourses([]);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>إنشاء حساب طالب جديد</CardTitle>
                <CardDescription>أدخلي بيانات الطالب والدورات لإنشاء حسابه في نظام المصادقة وقاعدة البيانات.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="student-name">اسم الطالب الكامل</Label>
                            <Input
                                id="student-name"
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                placeholder="مثال: محمد عبدالله"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="student-username">اسم المستخدم (باللغة الإنجليزية)</Label>
                            <Input
                                id="student-username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="مثال: mohammed123"
                                required
                            />
                            <p className="text-xs text-muted-foreground">
                                استخدم حروف إنجليزية وأرقام فقط، بدون مسافات أو رموز.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="student-password">كلمة المرور</Label>
                            <Input
                                id="student-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="6 أحرف على الأقل"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>الجنس</Label>
                            <Select onValueChange={(value: 'male' | 'female') => setGender(value)} defaultValue={gender}>
                                <SelectTrigger>
                                    <SelectValue placeholder="اختر الجنس" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">ذكر</SelectItem>
                                    <SelectItem value="female">أنثى</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="student-phone1">رقم الهاتف 1 (اختياري)</Label>
                            <Input
                                id="student-phone1"
                                type="tel"
                                value={phone1}
                                onChange={(e) => setPhone1(e.target.value)}
                                placeholder="رقم هاتف الطالب أو ولي الأمر"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="student-phone2">رقم الهاتف 2 (اختياري)</Label>
                            <Input
                                id="student-phone2"
                                type="tel"
                                value={phone2}
                                onChange={(e) => setPhone2(e.target.value)}
                                placeholder="رقم هاتف إضافي"
                            />
                        </div>
                        <div className="space-y-3 md:col-span-2">
                            <Label>الدورات المسجل بها</Label>
                            <div className="space-y-2 rounded-md border p-4">
                                {availableCourses.map(course => (
                                    <div key={course.id} className="flex items-center space-x-2 space-x-reverse">
                                        <Checkbox
                                            id={course.id}
                                            checked={selectedCourses.includes(course.id)}
                                            onCheckedChange={(checked) => {
                                                return checked
                                                    ? setSelectedCourses([...selectedCourses, course.id])
                                                    : setSelectedCourses(selectedCourses.filter(id => id !== course.id))
                                            }}
                                        />
                                        <label
                                            htmlFor={course.id}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {course.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <UserPlus className="me-2" />}
                        إنشاء الحساب
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
