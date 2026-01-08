'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
    Zap, BookOpen, Gamepad2, Trophy, CheckCircle, XCircle,
    ArrowRight, Eye, EyeOff, RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// ==================== LIGHT THEME COLOR PALETTE ====================
const COLORS = {
    bgLight: '#f8fafc',
    bgCanvas: '#e2e8f0',
    bgCard: '#ffffff',

    primary: '#6d28d9',
    primaryLight: '#8b5cf6',

    platePositive: '#dc2626',
    plateNegative: '#2563eb',

    wireActive: '#16a34a',
    wireInactive: '#9ca3af',

    probeRed: '#dc2626',
    probeBlack: '#1f2937',

    textPrimary: '#1e293b',
    textSecondary: '#64748b',

    battery: '#374151',
    batteryTerminal: '#fbbf24',
};

// ==================== CONSTANTS ====================
const EPSILON_0 = 8.854e-12;

// ==================== PHYSICS HOOK ====================
function useCapacitorPhysics(targetVoltage: number, plateArea: number, separation: number, isClosed: boolean) {
    const [voltage, setVoltage] = useState(0);

    useEffect(() => {
        if (isClosed && voltage < targetVoltage) {
            const timer = setTimeout(() => setVoltage(v => Math.min(v + 2, targetVoltage)), 30);
            return () => clearTimeout(timer);
        }
        if (!isClosed && voltage > 0) {
            const timer = setTimeout(() => setVoltage(v => Math.max(v - 4, 0)), 25);
            return () => clearTimeout(timer);
        }
    }, [isClosed, voltage, targetVoltage]);

    return useMemo(() => {
        const area = plateArea * 1e-4;
        const d = separation * 1e-3;
        const actualV = isClosed ? voltage : 0;
        const capacitance = (EPSILON_0 * area) / d;
        const charge = capacitance * actualV;
        const energy = 0.5 * capacitance * actualV * actualV;

        return {
            voltage: actualV,
            capacitance,
            charge,
            energy,
            chargeRatio: Math.min(actualV / 100, 1),
            isCharging: isClosed && voltage < targetVoltage
        };
    }, [voltage, plateArea, separation, isClosed, targetVoltage]);
}

// ==================== INTERACTIVE CANVAS ====================
interface InteractiveCircuitProps {
    voltage: number;
    plateArea: number;
    separation: number;
    isClosed: boolean;
    setIsClosed: (v: boolean) => void;
    showFieldLines: boolean;
    physics: ReturnType<typeof useCapacitorPhysics>;
}

function InteractiveCircuit({
    voltage,
    plateArea,
    separation,
    isClosed,
    setIsClosed,
    showFieldLines,
    physics
}: InteractiveCircuitProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);
    const voltmeterImgRef = useRef<HTMLImageElement | null>(null);

    // Probe positions
    const [redProbe, setRedProbe] = useState({ x: 480, y: 160 });
    const [blackProbe, setBlackProbe] = useState({ x: 510, y: 280 });

    // Drag state
    const [dragging, setDragging] = useState<'red' | 'black' | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    // Connection state
    const [redConnected, setRedConnected] = useState(false);
    const [blackConnected, setBlackConnected] = useState(false);

    // Layout constants
    const W = 700, H = 500;
    const plateX = 340;

    // DYNAMIC plate dimensions based on sliders
    const plateW = 100 + (plateArea - 50) * 0.6; // 100-190px
    const plateDepth = 30 + (plateArea - 50) * 0.2; // Depth for 3D effect
    const plateSkew = 25; // Skew for isometric look

    // DYNAMIC separation based on slider
    const visualSep = 80 + (separation - 1) * 6; // 80-194px

    const topPlateY = 170;
    const bottomPlateY = topPlateY + visualSep;

    const vmX = 600, vmY = 260;

    // Collision detection - updates with plate size
    const checkCollision = useCallback((probeX: number, probeY: number, plateY: number) => {
        return (
            probeX > plateX - plateW / 2 - plateSkew - 10 &&
            probeX < plateX + plateW / 2 + plateSkew + 50 &&
            Math.abs(probeY - plateY) < 40
        );
    }, [plateW]);

    const measuredVoltage = (redConnected && blackConnected) ? physics.voltage : 0;

    // Load voltmeter image
    useEffect(() => {
        const img = new Image();
        img.src = '/images/simulations/voltmeter.png';
        img.onload = () => {
            voltmeterImgRef.current = img;
        };
    }, []);

    // Draw function
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear with light background
        ctx.fillStyle = COLORS.bgCanvas;
        ctx.fillRect(0, 0, W, H);

        // Grid pattern
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 0.5;
        for (let x = 0; x < W; x += 30) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, H);
            ctx.stroke();
        }
        for (let y = 0; y < H; y += 30) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(W, y);
            ctx.stroke();
        }

        // ========== 3D CYLINDRICAL BATTERY ==========
        const battX = 70, battY = 240;
        const battRadius = 32, battHeight = 100;

        // Battery body (cylinder side)
        const battGrad = ctx.createLinearGradient(battX - battRadius, 0, battX + battRadius, 0);
        battGrad.addColorStop(0, '#1f2937');
        battGrad.addColorStop(0.3, '#4b5563');
        battGrad.addColorStop(0.5, '#6b7280');
        battGrad.addColorStop(0.7, '#4b5563');
        battGrad.addColorStop(1, '#1f2937');

        ctx.fillStyle = battGrad;
        ctx.beginPath();
        ctx.moveTo(battX - battRadius, battY - battHeight / 2);
        ctx.lineTo(battX - battRadius, battY + battHeight / 2);
        ctx.quadraticCurveTo(battX - battRadius, battY + battHeight / 2 + 15, battX, battY + battHeight / 2 + 15);
        ctx.quadraticCurveTo(battX + battRadius, battY + battHeight / 2 + 15, battX + battRadius, battY + battHeight / 2);
        ctx.lineTo(battX + battRadius, battY - battHeight / 2);
        ctx.closePath();
        ctx.fill();

        // Bottom ellipse
        ctx.fillStyle = '#374151';
        ctx.beginPath();
        ctx.ellipse(battX, battY + battHeight / 2, battRadius, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Top ellipse (main body)
        ctx.fillStyle = '#4b5563';
        ctx.beginPath();
        ctx.ellipse(battX, battY - battHeight / 2, battRadius, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // + Terminal (bump on top)
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.ellipse(battX, battY - battHeight / 2 - 8, 12, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('+', battX, battY - battHeight / 2 - 4);

        // Voltage label on battery
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.roundRect(battX - 22, battY - 15, 44, 30, 4);
        ctx.fill();
        ctx.fillStyle = '#22c55e';
        ctx.font = 'bold 18px monospace';
        ctx.fillText(`${voltage}V`, battX, battY + 8);

        // − Terminal indicator
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.ellipse(battX, battY + battHeight / 2 + 15, 10, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Arial';
        ctx.fillText('−', battX, battY + battHeight / 2 + 18);

        // ========== PREMIUM 3D WIRE HELPER ==========
        const draw3DWire = (points: { x: number, y: number }[], isActive: boolean) => {
            const darkColor = isActive ? '#15803d' : '#6b7280';
            const lightColor = isActive ? '#4ade80' : '#9ca3af';

            // Draw shadow first
            ctx.strokeStyle = 'rgba(0,0,0,0.3)';
            ctx.lineWidth = 10;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.beginPath();
            ctx.moveTo(points[0].x + 2, points[0].y + 2);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x + 2, points[i].y + 2);
            }
            ctx.stroke();

            // Draw dark base (gives 3D cylindrical look)
            ctx.strokeStyle = darkColor;
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.stroke();

            // Draw highlight on top (makes it look round)
            ctx.strokeStyle = lightColor;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y - 1);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y - 1);
            }
            ctx.stroke();
        };

        // Top wire (from + terminal to switch to TOP plate)
        draw3DWire([
            { x: battX, y: battY - battHeight / 2 - 14 },
            { x: battX, y: 50 },
            { x: 180, y: 50 },
            { x: 180, y: 90 }
        ], isClosed);

        // Switch to TOP capacitor plate (POSITIVE)
        draw3DWire([
            { x: 230, y: 90 },
            { x: plateX, y: 90 },
            { x: plateX, y: topPlateY - 20 }
        ], isClosed);

        // Bottom wire (from − terminal to BOTTOM plate)
        draw3DWire([
            { x: plateX, y: bottomPlateY + 20 },
            { x: plateX, y: H - 40 },
            { x: battX, y: H - 40 },
            { x: battX, y: battY + battHeight / 2 + 20 }
        ], isClosed);

        // ========== SWITCH ==========
        const switchX = 205, switchY = 90;

        ctx.fillStyle = '#1f2937';
        ctx.beginPath();
        ctx.arc(switchX - 25, switchY, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(switchX + 25, switchY, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = isClosed ? COLORS.wireActive : '#f97316';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(switchX - 25, switchY);
        ctx.lineTo(isClosed ? switchX + 25 : switchX + 15, isClosed ? switchY : switchY - 25);
        ctx.stroke();

        // Switch label
        ctx.fillStyle = COLORS.textSecondary;
        ctx.font = 'bold 12px Tajawal, Arial';
        ctx.fillText(isClosed ? 'مغلق ✓' : 'مفتوح', switchX - 15, switchY + 30);

        // ========== PREMIUM METALLIC CAPACITOR PLATES ==========
        const drawMetallicPlate = (x: number, y: number, w: number, depth: number, skew: number, isPositive: boolean, connected: boolean) => {
            const baseColor = isPositive ? '#9CA3AF' : '#9CA3AF'; // Metallic gray for both
            const highlightColor = '#E5E7EB';
            const shadowColor = '#4B5563';
            const accentColor = isPositive ? '#EF4444' : '#3B82F6'; // Red/Blue accent only

            // Calculate parallelogram corners
            const topLeft = { x: x - w / 2 + skew, y: y - depth / 2 };
            const topRight = { x: x + w / 2 + skew, y: y - depth / 2 };
            const bottomRight = { x: x + w / 2 - skew, y: y + depth / 2 };
            const bottomLeft = { x: x - w / 2 - skew, y: y + depth / 2 };

            // Drop shadow
            ctx.fillStyle = 'rgba(0,0,0,0.25)';
            ctx.beginPath();
            ctx.moveTo(topLeft.x + 6, topLeft.y + 6);
            ctx.lineTo(topRight.x + 6, topRight.y + 6);
            ctx.lineTo(bottomRight.x + 6, bottomRight.y + 6);
            ctx.lineTo(bottomLeft.x + 6, bottomLeft.y + 6);
            ctx.closePath();
            ctx.fill();

            // Main metallic surface with premium gradient
            const plateGrad = ctx.createLinearGradient(topLeft.x, topLeft.y - 10, bottomRight.x, bottomRight.y + 10);
            plateGrad.addColorStop(0, highlightColor);
            plateGrad.addColorStop(0.15, '#D1D5DB');
            plateGrad.addColorStop(0.5, baseColor);
            plateGrad.addColorStop(0.85, shadowColor);
            plateGrad.addColorStop(1, '#374151');

            ctx.fillStyle = plateGrad;
            ctx.beginPath();
            ctx.moveTo(topLeft.x, topLeft.y);
            ctx.lineTo(topRight.x, topRight.y);
            ctx.lineTo(bottomRight.x, bottomRight.y);
            ctx.lineTo(bottomLeft.x, bottomLeft.y);
            ctx.closePath();
            ctx.fill();

            // Top edge highlight (shiny metallic edge)
            ctx.strokeStyle = 'rgba(255,255,255,0.8)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(topLeft.x + 2, topLeft.y + 1);
            ctx.lineTo(topRight.x - 2, topRight.y + 1);
            ctx.stroke();

            // Bottom edge shadow
            ctx.strokeStyle = 'rgba(0,0,0,0.4)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(bottomLeft.x + 2, bottomLeft.y - 1);
            ctx.lineTo(bottomRight.x - 2, bottomRight.y - 1);
            ctx.stroke();

            // Colored accent strip along edge
            ctx.fillStyle = accentColor;
            ctx.beginPath();
            ctx.moveTo(topLeft.x - 3, topLeft.y);
            ctx.lineTo(topLeft.x, topLeft.y);
            ctx.lineTo(bottomLeft.x, bottomLeft.y);
            ctx.lineTo(bottomLeft.x - 3, bottomLeft.y);
            ctx.closePath();
            ctx.fill();

            // Side edge (3D thickness) with gradient
            const sideGrad = ctx.createLinearGradient(bottomLeft.x, bottomLeft.y, bottomLeft.x, bottomLeft.y + 12);
            sideGrad.addColorStop(0, shadowColor);
            sideGrad.addColorStop(1, '#1F2937');
            ctx.fillStyle = sideGrad;
            ctx.beginPath();
            ctx.moveTo(bottomLeft.x, bottomLeft.y);
            ctx.lineTo(bottomRight.x, bottomRight.y);
            ctx.lineTo(bottomRight.x, bottomRight.y + 12);
            ctx.lineTo(bottomLeft.x, bottomLeft.y + 12);
            ctx.closePath();
            ctx.fill();

            // Plate outline
            ctx.strokeStyle = connected ? '#22C55E' : '#374151';
            ctx.lineWidth = connected ? 3 : 2;
            if (connected) {
                ctx.shadowColor = '#22C55E';
                ctx.shadowBlur = 10;
            }
            ctx.beginPath();
            ctx.moveTo(topLeft.x, topLeft.y);
            ctx.lineTo(topRight.x, topRight.y);
            ctx.lineTo(bottomRight.x, bottomRight.y);
            ctx.lineTo(bottomLeft.x, bottomLeft.y);
            ctx.closePath();
            ctx.stroke();
            ctx.shadowBlur = 0;

            // SCREW-STYLE CONNECTION POINT
            const screwY = isPositive ? topLeft.y - 15 : bottomLeft.y + 20;

            // Screw base (outer ring)
            const screwGrad = ctx.createRadialGradient(x, screwY, 0, x, screwY, 10);
            screwGrad.addColorStop(0, '#F59E0B');
            screwGrad.addColorStop(0.7, '#D97706');
            screwGrad.addColorStop(1, '#92400E');
            ctx.fillStyle = screwGrad;
            ctx.beginPath();
            ctx.arc(x, screwY, 10, 0, Math.PI * 2);
            ctx.fill();

            // Screw inner circle
            ctx.fillStyle = '#FCD34D';
            ctx.beginPath();
            ctx.arc(x, screwY, 6, 0, Math.PI * 2);
            ctx.fill();

            // Screw slot (cross pattern)
            ctx.strokeStyle = '#78350F';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x - 4, screwY);
            ctx.lineTo(x + 4, screwY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, screwY - 4);
            ctx.lineTo(x, screwY + 4);
            ctx.stroke();

            // Screw highlight
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.beginPath();
            ctx.arc(x - 2, screwY - 2, 2, 0, Math.PI * 2);
            ctx.fill();

            // Charges distributed on surface
            if (physics.chargeRatio > 0.1) {
                const chargeCount = Math.floor(physics.chargeRatio * Math.min(8, w / 25));
                ctx.font = 'bold 18px Arial';
                ctx.textAlign = 'center';
                for (let i = 0; i < chargeCount; i++) {
                    const ratio = (i + 1) / (chargeCount + 1);
                    const cx = topLeft.x + (topRight.x - topLeft.x) * ratio;
                    // Charge with glow effect
                    ctx.fillStyle = isPositive ? 'rgba(239,68,68,0.8)' : 'rgba(59,130,246,0.8)';
                    ctx.beginPath();
                    ctx.arc(cx, y, 10, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = '#ffffff';
                    ctx.fillText(isPositive ? '+' : '−', cx, y + 6);
                }
            }

            // Label
            ctx.fillStyle = COLORS.textSecondary;
            ctx.font = 'bold 12px Tajawal, Arial';
            ctx.textAlign = 'left';
            ctx.fillText(isPositive ? 'صفيحة (+)' : 'صفيحة (−)', topRight.x + 20, y + 4);
        };

        // TOP plate is POSITIVE (connected to battery +)
        drawMetallicPlate(plateX, topPlateY, plateW, plateDepth, plateSkew, true, redConnected);
        // BOTTOM plate is NEGATIVE (connected to battery −)
        drawMetallicPlate(plateX, bottomPlateY, plateW, plateDepth, -plateSkew, false, blackConnected);

        // ========== DISTANCE INDICATOR ==========
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);

        // Dimension lines
        const dimX = plateX + plateW / 2 + 50;
        ctx.beginPath();
        ctx.moveTo(dimX, topPlateY);
        ctx.lineTo(dimX, bottomPlateY);
        ctx.stroke();

        // Arrows
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(dimX - 5, topPlateY + 10);
        ctx.lineTo(dimX, topPlateY);
        ctx.lineTo(dimX + 5, topPlateY + 10);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(dimX - 5, bottomPlateY - 10);
        ctx.lineTo(dimX, bottomPlateY);
        ctx.lineTo(dimX + 5, bottomPlateY - 10);
        ctx.stroke();

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`d = ${separation}mm`, dimX, (topPlateY + bottomPlateY) / 2 + 5);

        // ========== FIELD LINES ==========
        if (showFieldLines && physics.chargeRatio > 0.1) {
            ctx.strokeStyle = '#8b5cf6';
            ctx.lineWidth = 2;
            ctx.globalAlpha = physics.chargeRatio * 0.6;

            const fieldCount = Math.min(6, Math.floor(plateW / 25));
            const fieldSpacing = plateW / (fieldCount + 1);

            for (let i = 1; i <= fieldCount; i++) {
                const fx = plateX - plateW / 2 + i * fieldSpacing;
                ctx.beginPath();
                ctx.moveTo(fx, topPlateY + plateDepth / 2 + 10);
                ctx.lineTo(fx, bottomPlateY - plateDepth / 2 - 10);
                ctx.stroke();

                // Arrow
                ctx.beginPath();
                ctx.moveTo(fx - 5, bottomPlateY - plateDepth / 2 - 25);
                ctx.lineTo(fx, bottomPlateY - plateDepth / 2 - 10);
                ctx.lineTo(fx + 5, bottomPlateY - plateDepth / 2 - 25);
                ctx.stroke();
            }

            ctx.globalAlpha = 1;
        }

        // ========== VOLTMETER (IMAGE) ==========
        if (voltmeterImgRef.current) {
            const vmW = 100, vmH = 140;
            ctx.drawImage(voltmeterImgRef.current, vmX - vmW / 2, vmY - vmH / 2, vmW, vmH);

            // Draw voltage reading over the LCD
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(vmX - 35, vmY - 50, 70, 35);
            ctx.fillStyle = '#22c55e';
            ctx.font = 'bold 24px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`${measuredVoltage.toFixed(1)}`, vmX - 5, vmY - 25);
            ctx.font = 'bold 14px Arial';
            ctx.fillText('V', vmX + 28, vmY - 25);
        } else {
            // Fallback: Draw simple voltmeter
            ctx.fillStyle = '#374151';
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.roundRect(vmX - 50, vmY - 70, 100, 140, 10);
            ctx.fill();
            ctx.stroke();

            // LCD
            ctx.fillStyle = '#0f172a';
            ctx.beginPath();
            ctx.roundRect(vmX - 40, vmY - 55, 80, 40, 6);
            ctx.fill();
            ctx.fillStyle = '#22c55e';
            ctx.font = 'bold 26px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`${measuredVoltage.toFixed(1)}`, vmX - 5, vmY - 25);
            ctx.font = 'bold 16px Arial';
            ctx.fillText('V', vmX + 32, vmY - 25);

            // Dial
            ctx.fillStyle = '#1f2937';
            ctx.beginPath();
            ctx.arc(vmX, vmY + 15, 25, 0, Math.PI * 2);
            ctx.fill();
        }

        // ========== PREMIUM PROBE CABLES (3D) ==========
        const draw3DCable = (startX: number, startY: number, endX: number, endY: number, color: string, darkColor: string) => {
            const cp1X = startX;
            const cp1Y = startY + 60;
            const cp2X = endX;
            const cp2Y = endY + 80;

            // Shadow
            ctx.strokeStyle = 'rgba(0,0,0,0.3)';
            ctx.lineWidth = 10;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(startX + 2, startY + 2);
            ctx.bezierCurveTo(cp1X + 2, cp1Y + 2, cp2X + 2, cp2Y + 2, endX + 2, endY + 37);
            ctx.stroke();

            // Dark base
            ctx.strokeStyle = darkColor;
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY + 35);
            ctx.stroke();

            // Highlight
            ctx.strokeStyle = color;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(startX, startY - 1);
            ctx.bezierCurveTo(cp1X, cp1Y - 1, cp2X, cp2Y - 1, endX, endY + 34);
            ctx.stroke();
        };

        draw3DCable(vmX - 25, vmY + 55, redProbe.x, redProbe.y, '#EF4444', '#991B1B');
        draw3DCable(vmX + 25, vmY + 55, blackProbe.x, blackProbe.y, '#4B5563', '#1F2937');

        // ========== PREMIUM PROBES ==========
        const drawPremiumProbe = (x: number, y: number, color: string, darkColor: string, isDragging: boolean) => {
            // -------- HANDLE (plastic with gradient) --------
            const handleGrad = ctx.createLinearGradient(x - 10, 0, x + 10, 0);
            handleGrad.addColorStop(0, darkColor);
            handleGrad.addColorStop(0.3, color);
            handleGrad.addColorStop(0.7, color);
            handleGrad.addColorStop(1, darkColor);

            ctx.fillStyle = handleGrad;
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(x - 10, y + 12, 20, 55, 8);
            ctx.fill();
            ctx.stroke();

            // Handle highlight
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.beginPath();
            ctx.roundRect(x - 6, y + 16, 4, 45, 2);
            ctx.fill();

            // Grip texture (rubber rings)
            for (let i = 0; i < 5; i++) {
                ctx.fillStyle = isDragging ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)';
                ctx.fillRect(x - 8, y + 20 + i * 9, 16, 4);
            }

            // Collar (metal ring between handle and shaft)
            const collarGrad = ctx.createLinearGradient(x - 8, 0, x + 8, 0);
            collarGrad.addColorStop(0, '#6B7280');
            collarGrad.addColorStop(0.5, '#E5E7EB');
            collarGrad.addColorStop(1, '#6B7280');
            ctx.fillStyle = collarGrad;
            ctx.beginPath();
            ctx.roundRect(x - 8, y + 5, 16, 10, 2);
            ctx.fill();

            // -------- METAL SHAFT --------
            const shaftGrad = ctx.createLinearGradient(x - 5, 0, x + 5, 0);
            shaftGrad.addColorStop(0, '#9CA3AF');
            shaftGrad.addColorStop(0.3, '#E5E7EB');
            shaftGrad.addColorStop(0.5, '#F3F4F6');
            shaftGrad.addColorStop(0.7, '#E5E7EB');
            shaftGrad.addColorStop(1, '#9CA3AF');

            ctx.fillStyle = shaftGrad;
            ctx.beginPath();
            ctx.roundRect(x - 4, y - 25, 8, 35, 2);
            ctx.fill();
            ctx.strokeStyle = '#6B7280';
            ctx.lineWidth = 1;
            ctx.stroke();

            // -------- METAL TIP (pointed) --------
            const tipGrad = ctx.createRadialGradient(x, y - 28, 0, x, y - 28, 8);
            tipGrad.addColorStop(0, '#F3F4F6');
            tipGrad.addColorStop(0.5, '#D1D5DB');
            tipGrad.addColorStop(1, '#9CA3AF');

            ctx.fillStyle = tipGrad;
            ctx.beginPath();
            ctx.moveTo(x - 5, y - 25);
            ctx.lineTo(x, y - 35);
            ctx.lineTo(x + 5, y - 25);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = '#6B7280';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Tip highlight
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.beginPath();
            ctx.moveTo(x - 2, y - 27);
            ctx.lineTo(x, y - 32);
            ctx.lineTo(x + 1, y - 27);
            ctx.closePath();
            ctx.fill();

            // Glow when dragging
            if (isDragging) {
                ctx.shadowColor = color;
                ctx.shadowBlur = 20;
                ctx.strokeStyle = color;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.roundRect(x - 12, y + 10, 24, 60, 10);
                ctx.stroke();
                ctx.shadowBlur = 0;
            }
        };

        drawPremiumProbe(redProbe.x, redProbe.y, '#EF4444', '#991B1B', dragging === 'red');
        drawPremiumProbe(blackProbe.x, blackProbe.y, '#374151', '#111827', dragging === 'black');

        // ========== INSTRUCTIONS ==========
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.strokeStyle = COLORS.primary;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(10, 10, 200, 50, 10);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = COLORS.textPrimary;
        ctx.font = 'bold 13px Tajawal, Arial';
        ctx.textAlign = 'left';
        ctx.fillText('🔌 اسحب المجسات إلى الصفائح', 20, 32);
        ctx.fillStyle = COLORS.textSecondary;
        ctx.font = '11px Tajawal, Arial';
        ctx.fillText('ثم أغلق المفتاح لقياس الجهد', 20, 50);

        animationRef.current = requestAnimationFrame(draw);
    }, [voltage, isClosed, showFieldLines, physics, redProbe, blackProbe, redConnected, blackConnected, dragging, separation, plateArea, measuredVoltage, plateW, plateDepth, plateSkew, visualSep, topPlateY, bottomPlateY]);

    // Start animation
    useEffect(() => {
        draw();
        return () => cancelAnimationFrame(animationRef.current);
    }, [draw]);

    // Mouse handlers
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (W / rect.width);
        const y = (e.clientY - rect.top) * (H / rect.height);

        if (Math.abs(x - redProbe.x) < 25 && Math.abs(y - redProbe.y - 30) < 50) {
            setDragging('red');
            setDragOffset({ x: x - redProbe.x, y: y - redProbe.y });
            return;
        }

        if (Math.abs(x - blackProbe.x) < 25 && Math.abs(y - blackProbe.y - 30) < 50) {
            setDragging('black');
            setDragOffset({ x: x - blackProbe.x, y: y - blackProbe.y });
            return;
        }

        if (Math.abs(x - 205) < 50 && Math.abs(y - 90) < 40) {
            setIsClosed(!isClosed);
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!dragging) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (W / rect.width);
        const y = (e.clientY - rect.top) * (H / rect.height);

        const newX = Math.max(50, Math.min(W - 50, x - dragOffset.x));
        const newY = Math.max(50, Math.min(H - 80, y - dragOffset.y));

        if (dragging === 'red') {
            setRedProbe({ x: newX, y: newY });
            setRedConnected(checkCollision(newX, newY, topPlateY));
        } else {
            setBlackProbe({ x: newX, y: newY });
            setBlackConnected(checkCollision(newX, newY, bottomPlateY));
        }
    };

    const handleMouseUp = () => {
        // Snap probes to plate edge (dynamic based on current plateW)
        const snapX = plateX + plateW / 2 + plateSkew + 20;
        if (dragging === 'red' && checkCollision(redProbe.x, redProbe.y, topPlateY)) {
            setRedProbe({ x: snapX, y: topPlateY });
            setRedConnected(true);
        }
        if (dragging === 'black' && checkCollision(blackProbe.x, blackProbe.y, bottomPlateY)) {
            setBlackProbe({ x: snapX, y: bottomPlateY });
            setBlackConnected(true);
        }
        setDragging(null);
    };

    return (
        <canvas
            ref={canvasRef}
            width={W}
            height={H}
            className="w-full rounded-xl border-2 border-slate-300 shadow-lg cursor-pointer bg-white"
            style={{ maxHeight: '480px' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        />
    );
}

// ==================== MEASUREMENTS PANEL ====================
function MeasurementsPanel({ physics, plateArea, separation }: {
    physics: ReturnType<typeof useCapacitorPhysics>;
    plateArea: number;
    separation: number;
}) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
                {[
                    { label: 'فرق الجهد', value: physics.voltage.toFixed(2), unit: 'V', icon: '⚡' },
                    { label: 'السعة', value: (physics.capacitance * 1e12).toFixed(2), unit: 'pF', icon: '📊' },
                    { label: 'الشحنة', value: (physics.charge * 1e12).toFixed(2), unit: 'pC', icon: '🔋' },
                    { label: 'طاقة الوضع', value: (physics.energy * 1e9).toFixed(2), unit: 'nJ', icon: '💡' },
                ].map((item, i) => (
                    <Card key={i} className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-4">
                            <div className="text-sm text-slate-500 mb-1">{item.icon} {item.label}</div>
                            <div className="text-2xl font-bold text-slate-800">
                                {item.value} <span className="text-lg text-purple-600">{item.unit}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-purple-700">⚡ القوانين الأساسية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="bg-white/80 p-3 rounded-lg shadow-sm">
                        <BlockMath math={`C = \\varepsilon_0 \\cdot \\frac{A}{d}`} />
                    </div>
                    <div className="bg-white/80 p-3 rounded-lg shadow-sm">
                        <BlockMath math={`PE = \\frac{1}{2}C \\cdot V^2`} />
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 mb-1">المساحة A</div>
                    <div className="text-lg font-bold text-blue-800">{plateArea} cm²</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 mb-1">المسافة d</div>
                    <div className="text-lg font-bold text-green-800">{separation} mm</div>
                </div>
            </div>
        </div>
    );
}

// ==================== LEARN TAB ====================
function LearnTab() {
    return (
        <div className="space-y-6 text-right" dir="rtl">
            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        ما هو المواسع؟
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-slate-700">
                    <p>
                        <strong className="text-purple-700">المواسع (Capacitor)</strong> هو عنصر كهربائي يخزن الطاقة
                        الكهربائية في مجال كهربائي. يتكون من صفيحتين موصلتين متوازيتين يفصل بينهما عازل.
                    </p>

                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h4 className="font-bold text-purple-700 mb-2">السعة الكهربائية:</h4>
                        <BlockMath math="C = \varepsilon_0 \cdot \frac{A}{d}" />
                        <ul className="mt-3 space-y-1 text-sm text-slate-600">
                            <li><InlineMath math="C" /> = السعة (فاراد)</li>
                            <li><InlineMath math="\varepsilon_0" /> = سماحية الفراغ</li>
                            <li><InlineMath math="A" /> = مساحة الصفيحة</li>
                            <li><InlineMath math="d" /> = المسافة بين الصفيحتين</li>
                        </ul>
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                        <h4 className="font-bold text-indigo-700 mb-2">الطاقة المختزنة:</h4>
                        <BlockMath math="PE = \frac{1}{2}CV^2 = \frac{Q^2}{2C}" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// ==================== CHALLENGE TAB ====================
function ChallengeTab({ physics }: { physics: ReturnType<typeof useCapacitorPhysics> }) {
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const questions = [
        { q: "ماذا يحدث للسعة عند زيادة المساحة؟", options: ["تزداد", "تنقص", "لا تتغير"], correct: 0 },
        { q: "ماذا يحدث للسعة عند زيادة المسافة؟", options: ["تزداد", "تنقص", "لا تتغير"], correct: 1 },
        { q: "ما وحدة قياس السعة الكهربائية؟", options: ["فولت", "فاراد", "أمبير"], correct: 1 }
    ];

    const handleAnswer = (idx: number) => {
        if (answered) return;
        setAnswered(true);
        const correct = idx === questions[currentQ].correct;
        setIsCorrect(correct);
        if (correct) setScore(s => s + 1);
    };

    const nextQuestion = () => {
        if (currentQ < questions.length - 1) {
            setCurrentQ(q => q + 1);
            setAnswered(false);
        }
    };

    return (
        <div className="space-y-4" dir="rtl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-purple-600">
                    <Trophy className="w-5 h-5" />
                    <span className="font-semibold">النقاط: {score}/{questions.length}</span>
                </div>
                <Progress value={(currentQ + 1) / questions.length * 100} className="w-32" />
            </div>

            <Card className="bg-white border-slate-200 shadow-sm">
                <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">{questions[currentQ].q}</h3>

                    <div className="space-y-2">
                        {questions[currentQ].options.map((opt, idx) => (
                            <Button
                                key={idx}
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-right",
                                    answered && idx === questions[currentQ].correct && "bg-green-100 border-green-500 text-green-700",
                                    answered && idx !== questions[currentQ].correct && "opacity-50"
                                )}
                                onClick={() => handleAnswer(idx)}
                                disabled={answered}
                            >
                                {opt}
                            </Button>
                        ))}
                    </div>

                    {answered && (
                        <div className="mt-4 flex items-center justify-between">
                            {isCorrect ? (
                                <div className="flex items-center gap-2 text-green-600">
                                    <CheckCircle className="w-5 h-5" />
                                    <span>إجابة صحيحة!</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-red-500">
                                    <XCircle className="w-5 h-5" />
                                    <span>إجابة خاطئة</span>
                                </div>
                            )}

                            {currentQ < questions.length - 1 && (
                                <Button onClick={nextQuestion} className="bg-purple-600 hover:bg-purple-700">
                                    السؤال التالي <ArrowRight className="w-4 h-4 mr-2" />
                                </Button>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

// ==================== MAIN COMPONENT ====================
export default function CapacitorLabSimulation() {
    const [voltage, setVoltage] = useState(50);
    const [plateArea, setPlateArea] = useState(100);
    const [separation, setSeparation] = useState(10);
    const [isClosed, setIsClosed] = useState(false);
    const [showFieldLines, setShowFieldLines] = useState(true);
    const [activeTab, setActiveTab] = useState('explore');

    const physics = useCapacitorPhysics(voltage, plateArea, separation, isClosed);

    const resetSimulation = () => {
        setVoltage(50);
        setPlateArea(100);
        setSeparation(10);
        setIsClosed(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-50 to-indigo-100 text-slate-800 p-4 md:p-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
                    ⚡ مختبر المواسعات الافتراضي
                </h1>
                <p className="text-slate-500 mt-2">محاكاة تفاعلية احترافية - مستوى جامعي</p>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-7xl mx-auto">
                <TabsList className="grid w-full grid-cols-3 bg-white border border-slate-200 mb-6 shadow-sm">
                    <TabsTrigger value="explore" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                        <Zap className="w-4 h-4 ml-2" />استكشاف
                    </TabsTrigger>
                    <TabsTrigger value="learn" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                        <BookOpen className="w-4 h-4 ml-2" />تعلم
                    </TabsTrigger>
                    <TabsTrigger value="challenge" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                        <Gamepad2 className="w-4 h-4 ml-2" />تحدي
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="explore">
                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <Card className="bg-white border-slate-200 shadow-lg overflow-hidden">
                                <CardContent className="p-4">
                                    <InteractiveCircuit
                                        voltage={voltage}
                                        plateArea={plateArea}
                                        separation={separation}
                                        isClosed={isClosed}
                                        setIsClosed={setIsClosed}
                                        showFieldLines={showFieldLines}
                                        physics={physics}
                                    />

                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <Switch checked={showFieldLines} onCheckedChange={setShowFieldLines} />
                                                    <Label className="text-slate-600 flex items-center gap-1">
                                                        {showFieldLines ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                        خطوط المجال
                                                    </Label>
                                                </div>
                                            </div>
                                            <Button variant="outline" onClick={resetSimulation} className="border-purple-300 text-purple-600 hover:bg-purple-50">
                                                <RotateCcw className="w-4 h-4 ml-2" />إعادة ضبط
                                            </Button>
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="space-y-2 bg-amber-50 p-3 rounded-lg border border-amber-200">
                                                <Label className="text-amber-700 font-semibold">🔋 جهد البطارية: {voltage}V</Label>
                                                <Slider value={[voltage]} onValueChange={([v]) => setVoltage(v)} min={10} max={100} step={5} className="[&_[role=slider]]:bg-amber-500" />
                                            </div>
                                            <div className="space-y-2 bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                <Label className="text-blue-700 font-semibold">📐 مساحة الصفائح: {plateArea}cm²</Label>
                                                <Slider value={[plateArea]} onValueChange={([v]) => setPlateArea(v)} min={50} max={200} step={10} className="[&_[role=slider]]:bg-blue-500" />
                                            </div>
                                            <div className="space-y-2 bg-green-50 p-3 rounded-lg border border-green-200">
                                                <Label className="text-green-700 font-semibold">↕️ المسافة d: {separation}mm</Label>
                                                <Slider value={[separation]} onValueChange={([v]) => setSeparation(v)} min={1} max={20} step={1} className="[&_[role=slider]]:bg-green-500" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div>
                            <MeasurementsPanel physics={physics} plateArea={plateArea} separation={separation} />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="learn">
                    <LearnTab />
                </TabsContent>

                <TabsContent value="challenge">
                    <ChallengeTab physics={physics} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
