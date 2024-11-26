import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Icon } from '@iconify/react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import AuthenticatedLayout from './Layouts/AuthenticatedLayout';

const STEPS = [
  { id: 'upload', label: 'Upload File', icon: 'mdi:upload' },
  { id: 'save', label: 'Save File', icon: 'mdi:content-save' },
  { id: 'extract', label: 'Extract Data', icon: 'mdi:table' },
  { id: 'complete', label: 'Save to Database', icon: 'mdi:database' }
];

const StepProgress = ({ currentStep }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between">
        {STEPS.map((step, index) => {
          const isActive = index <= STEPS.findIndex(s => s.id === currentStep);
          const isCompleted = index < STEPS.findIndex(s => s.id === currentStep);
          
          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className="relative flex items-center justify-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center
                  ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  <Icon icon={step.icon} className="w-5 h-5" />
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`absolute w-full h-1 left-1/2 top-1/2 -translate-y-1/2
                    ${isCompleted ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </div>
              <span className={`mt-2 text-sm ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
