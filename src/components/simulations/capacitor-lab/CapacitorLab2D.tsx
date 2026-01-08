'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Zap, RotateCcw, Battery, Ruler, Move } from 'lucide-react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const EPSILON_0 = 8.854e-12;

export default function CapacitorLab2D() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [voltage, setVoltage] = useState(50);
    const [plateArea, setPlateArea] = useState(100);
    const [separation, setSeparation] = useState(10);
    const [isConnected, setIsConnected] = useState(false);
    const [showFieldLines, setShowFieldLines] = useState(true);
    const [currentVoltage, setCurrentVoltage] = useState(0);
    const [storedCharge, setStoredCharge] = useState(0);
    const animationRef = useRef<number>(0);
    const timeRef = useRef<number>(0);

    const area = plateArea * 1e-4;
    const d = separation * 1e-3;
    const capacitance = (EPSILON_0 * area) / d;

    let displayVoltage: number;
    let displayCharge: number;

    if (isConnected) {
        displayVoltage = currentVoltage;
        displayCharge = capacitance * currentVoltage;
    } else {
        displayVoltage = storedCharge > 0 ? storedCharge / capacitance : 0;
        displayCharge = storedCharge;
    }

    const energy = 0.5 * capacitance * displayVoltage * displayVoltage;

    useEffect(() => {
        if (isConnected && currentVoltage < voltage) {
            const timer = setTimeout(() => setCurrentVoltage(v => Math.min(v + 2, voltage)), 30);
            return () => clearTimeout(timer);
        }
        if (isConnected && currentVoltage > voltage) setCurrentVoltage(voltage);
    }, [isConnected, currentVoltage, voltage]);

    useEffect(() => {
        if (!isConnected && currentVoltage > 0) setStoredCharge(capacitance * currentVoltage);
    }, [isConnected]);

    useEffect(() => {
        if (isConnected) setStoredCharge(0);
    }, [isConnected]);

    const resetSimulation = () => {
        setVoltage(50);
        setPlateArea(100);
        setSeparation(10);
        setIsConnected(false);
        setCurrentVoltage(0);
        setStoredCharge(0);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;

        const draw = () => {
            timeRef.current += 0.02;
            ctx.clearRect(0, 0, W, H);

            // PhET blue background
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(0, 0, W, H);

            // Layout
            const centerX = W * 0.55;
            const centerY = H * 0.5;
            const plateWidth = 100 + (plateArea - 50) * 1.0;
            const plateDepthIso = 60;
            const plateThickness = 10;
            const visualSep = 80 + (separation - 1) * 4;
            const topPlateY = centerY - visualSep / 2;
            const bottomPlateY = centerY + visualSep / 2;
            const isoOffsetX = plateDepthIso * 0.5;
            const isoOffsetY = plateDepthIso * 0.3;

            // Battery
            const batteryX = 85;
            const batteryY = centerY;
            const batteryRadius = 28;
            const batteryTop = batteryY - 65;

            // Terminal
            ctx.fillStyle = '#333';
            ctx.fillRect(batteryX - 5, batteryTop - 12, 10, 12);

            // Top gold
            const goldGrad = ctx.createLinearGradient(batteryX - batteryRadius, 0, batteryX + batteryRadius, 0);
            goldGrad.addColorStop(0, '#B8860B');
            goldGrad.addColorStop(0.5, '#FFD700');
            goldGrad.addColorStop(1, '#B8860B');
            ctx.fillStyle = goldGrad;
            ctx.fillRect(batteryX - batteryRadius, batteryTop, batteryRadius * 2, 35);
            ctx.fillStyle = '#000';
            ctx.font = 'bold 11px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`${voltage} V`, batteryX, batteryTop + 22);

            // Gray middle
            const grayGrad = ctx.createLinearGradient(batteryX - batteryRadius, 0, batteryX + batteryRadius, 0);
            grayGrad.addColorStop(0, '#555');
            grayGrad.addColorStop(0.5, '#888');
            grayGrad.addColorStop(1, '#555');
            ctx.fillStyle = grayGrad;
            ctx.fillRect(batteryX - batteryRadius, batteryTop + 35, batteryRadius * 2, 35);
            ctx.fillStyle = '#FFF';
            ctx.fillText('0 V', batteryX, batteryTop + 57);

            // Dark bottom
            const darkGrad = ctx.createLinearGradient(batteryX - batteryRadius, 0, batteryX + batteryRadius, 0);
            darkGrad.addColorStop(0, '#222');
            darkGrad.addColorStop(0.5, '#444');
            darkGrad.addColorStop(1, '#222');
            ctx.fillStyle = darkGrad;
            ctx.fillRect(batteryX - batteryRadius, batteryTop + 70, batteryRadius * 2, 35);
            ctx.fillStyle = '#FFF';
            ctx.fillText(`-${voltage} V`, batteryX, batteryTop + 92);

            // Bottom ellipse
            ctx.fillStyle = '#222';
            ctx.beginPath();
            ctx.ellipse(batteryX, batteryTop + 105, batteryRadius, 8, 0, 0, Math.PI * 2);
            ctx.fill();

            // Edges
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(batteryX - batteryRadius, batteryTop);
            ctx.lineTo(batteryX - batteryRadius, batteryTop + 105);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(batteryX + batteryRadius, batteryTop);
            ctx.lineTo(batteryX + batteryRadius, batteryTop + 105);
            ctx.stroke();

            // Wires & Switch
            const switchX = batteryX + 60;
            const switchY = 38;
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 3;

            // Top wire before switch
            ctx.beginPath();
            ctx.moveTo(batteryX, batteryTop - 12);
            ctx.lineTo(batteryX, switchY);
            ctx.lineTo(switchX - 12, switchY);
            ctx.stroke();

            // Switch
            ctx.fillStyle = '#333';
            ctx.beginPath();
            ctx.arc(switchX - 12, switchY, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(switchX + 12, switchY, 5, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = '#777';
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(switchX - 12, switchY);
            if (isConnected) {
                ctx.lineTo(switchX + 12, switchY);
            } else {
                ctx.lineTo(switchX + 3, switchY - 18);
            }
            ctx.stroke();

            ctx.fillStyle = isConnected ? '#16A34A' : '#DC2626';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(isConnected ? 'Connected' : 'Disconnected', switchX, switchY - 25);

            // Top wire after switch
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(switchX + 12, switchY);
            ctx.lineTo(centerX, switchY);
            ctx.lineTo(centerX, topPlateY - 15);
            ctx.stroke();

            // Bottom wire
            ctx.beginPath();
            ctx.moveTo(batteryX, batteryTop + 105);
            ctx.lineTo(batteryX, H - 30);
            ctx.lineTo(centerX, H - 30);
            ctx.lineTo(centerX, bottomPlateY + plateThickness + 15);
            ctx.stroke();

            // Draw plates function
            const drawPlate = (baseY: number) => {
                const leftX = centerX - plateWidth / 2;
                const rightX = centerX + plateWidth / 2;

                // Top surface
                ctx.fillStyle = '#F5F5F5';
                ctx.strokeStyle = '#333';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(leftX, baseY);
                ctx.lineTo(leftX + isoOffsetX, baseY - isoOffsetY);
                ctx.lineTo(rightX + isoOffsetX, baseY - isoOffsetY);
                ctx.lineTo(rightX, baseY);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Grid
                ctx.strokeStyle = '#DDD';
                ctx.lineWidth = 1;
                for (let i = 1; i < 3; i++) {
                    const prog = i / 3;
                    ctx.beginPath();
                    ctx.moveTo(leftX + prog * isoOffsetX, baseY - prog * isoOffsetY);
                    ctx.lineTo(rightX + prog * isoOffsetX, baseY - prog * isoOffsetY);
                    ctx.stroke();
                }
                const step = Math.max(20, plateWidth / 6);
                for (let x = leftX + step; x < rightX; x += step) {
                    ctx.beginPath();
                    ctx.moveTo(x, baseY);
                    ctx.lineTo(x + isoOffsetX, baseY - isoOffsetY);
                    ctx.stroke();
                }

                // Front
                ctx.fillStyle = '#E0E0E0';
                ctx.strokeStyle = '#333';
                ctx.lineWidth = 2;
                ctx.fillRect(leftX, baseY, plateWidth, plateThickness);
                ctx.strokeRect(leftX, baseY, plateWidth, plateThickness);

                // Side
                ctx.fillStyle = '#CCC';
                ctx.beginPath();
                ctx.moveTo(rightX, baseY);
                ctx.lineTo(rightX + isoOffsetX, baseY - isoOffsetY);
                ctx.lineTo(rightX + isoOffsetX, baseY + plateThickness - isoOffsetY);
                ctx.lineTo(rightX, baseY + plateThickness);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            };

            drawPlate(topPlateY);
            drawPlate(bottomPlateY);

            // Charges & Field Lines - constrained to plate
            const chargeRatio = Math.min(displayVoltage / 100, 1);
            const maxCols = Math.max(2, Math.floor(plateWidth / 28));
            const numCols = Math.min(maxCols, Math.floor(chargeRatio * 6) + (displayVoltage > 0 ? 2 : 0));
            const leftX = centerX - plateWidth / 2;
            const spacing = plateWidth / (numCols + 1);

            if (numCols > 0) {
                ctx.font = 'bold 15px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // + on top
                for (let r = 0; r < 3; r++) {
                    for (let c = 0; c < numCols; c++) {
                        const prog = (r + 0.5) / 3;
                        const x = leftX + spacing * (c + 1) + prog * isoOffsetX;
                        const y = topPlateY - prog * isoOffsetY - 4 + Math.sin(timeRef.current * 2 + c) * 1.5;
                        ctx.fillStyle = '#DC2626';
                        ctx.fillText('+', x, y);
                    }
                }

                // - on bottom
                for (let r = 0; r < 3; r++) {
                    for (let c = 0; c < numCols; c++) {
                        const prog = (r + 0.5) / 3;
                        const x = leftX + spacing * (c + 1) + prog * isoOffsetX;
                        const y = bottomPlateY - prog * isoOffsetY - 4 + Math.sin(timeRef.current * 2 + c + Math.PI) * 1.5;
                        ctx.fillStyle = '#2563EB';
                        ctx.fillText('−', x, y);
                    }
                }
            }

            // Field lines
            if (showFieldLines && displayVoltage > 0 && isConnected) {
                ctx.strokeStyle = '#333';
                ctx.fillStyle = '#333';
                ctx.lineWidth = 2;

                for (let r = 0; r < 3; r++) {
                    for (let c = 0; c < numCols; c++) {
                        const prog = (r + 0.5) / 3;
                        const x = leftX + spacing * (c + 1) + prog * isoOffsetX;
                        const startY = topPlateY + plateThickness + 3;
                        const endY = bottomPlateY - 3;

                        ctx.beginPath();
                        ctx.moveTo(x, startY);
                        ctx.lineTo(x, endY);
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.moveTo(x, endY);
                        ctx.lineTo(x - 4, endY - 7);
                        ctx.lineTo(x + 4, endY - 7);
                        ctx.closePath();
                        ctx.fill();
                    }
                }
            }

            // Labels
            ctx.fillStyle = '#333';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(`Separation: ${separation} mm`, leftX - 80, centerY);
            ctx.fillText(`Plate Area: ${plateArea} mm²`, leftX, bottomPlateY + isoOffsetY + 40);

            animationRef.current = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animationRef.current);
    }, [voltage, plateArea, separation, isConnected, currentVoltage, displayVoltage, showFieldLines, storedCharge]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-50 to-indigo-100 p-4 md:p-8">
            <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
                    ⚡ مختبر المواسعات التفاعلي
                </h1>
                <p className="text-slate-500 mt-2">شاهد كيف تتغير الشحنات والمجال الكهربائي</p>
            </div>

            <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card className="bg-white shadow-xl overflow-hidden">
                        <CardContent className="p-0">
                            <canvas
                                ref={canvasRef}
                                width={700}
                                height={450}
                                className="w-full cursor-pointer"
                                onClick={() => setIsConnected(!isConnected)}
                            />
                            <div className="p-4 bg-gradient-to-r from-slate-800 to-slate-700 text-white grid grid-cols-4 gap-4 text-center">
                                <div>
                                    <div className="text-xs text-slate-400">الجهد V</div>
                                    <div className="text-xl font-mono font-bold text-yellow-400">{displayVoltage.toFixed(1)} V</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400">السعة C</div>
                                    <div className="text-xl font-mono font-bold text-green-400">{(capacitance * 1e12).toFixed(2)} pF</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400">الشحنة Q</div>
                                    <div className="text-xl font-mono font-bold text-blue-400">{(displayCharge * 1e12).toFixed(2)} pC</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400">الطاقة PE</div>
                                    <div className="text-xl font-mono font-bold text-purple-400">{(energy * 1e12).toFixed(2)} pJ</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-4">
                    <Card className="bg-white shadow-lg">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Battery className="w-5 h-5 text-yellow-500" />
                                التوصيل بالبطارية
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <Label className={isConnected ? 'text-green-600 font-bold' : 'text-red-600'}>
                                    {isConnected ? '🔌 متصل' : '🔓 مفصول'}
                                </Label>
                                <Switch checked={isConnected} onCheckedChange={setIsConnected} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-lg">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Ruler className="w-5 h-5 text-blue-500" />
                                المتغيرات
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <Label><Zap className="w-4 h-4 inline text-yellow-500" /> جهد البطارية</Label>
                                    <span className="font-mono font-bold text-yellow-600">{voltage} V</span>
                                </div>
                                <Slider value={[voltage]} onValueChange={([v]) => setVoltage(v)} min={10} max={100} step={5} />
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <Label><Move className="w-4 h-4 inline text-green-500" /> مساحة الصفيحة</Label>
                                    <span className="font-mono font-bold text-green-600">{plateArea} mm²</span>
                                </div>
                                <Slider value={[plateArea]} onValueChange={([v]) => setPlateArea(v)} min={50} max={200} step={10} />
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <Label>↕️ المسافة</Label>
                                    <span className="font-mono font-bold text-blue-600">{separation} mm</span>
                                </div>
                                <Slider value={[separation]} onValueChange={([v]) => setSeparation(v)} min={2} max={30} step={1} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-lg">
                        <CardContent className="pt-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>خطوط المجال</Label>
                                <Switch checked={showFieldLines} onCheckedChange={setShowFieldLines} />
                            </div>
                            <Button onClick={resetSimulation} variant="outline" className="w-full">
                                <RotateCcw className="w-4 h-4 mr-2" /> إعادة ضبط
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 shadow-lg">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">📐 المعادلات</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div className="bg-white/80 p-2 rounded"><BlockMath math={`C = \\varepsilon_0 \\cdot \\frac{A}{d}`} /></div>
                            <div className="bg-white/80 p-2 rounded"><BlockMath math={`Q = C \\cdot V`} /></div>
                            <div className="bg-white/80 p-2 rounded"><BlockMath math={`PE = \\frac{1}{2}CV^2`} /></div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
