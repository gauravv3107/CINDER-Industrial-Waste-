import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useJobs, JOB_CATEGORIES } from '../../context/JobsContext';
import { Briefcase } from 'lucide-react';

export function PostContractModal({ isOpen, onClose }) {
  const { postNewContract } = useJobs();

  const [formData, setFormData] = useState({
    title: '',
    company: 'Equinix Thermal Operations',
    city: 'Ashburn, VA',
    distanceKm: 3.5,
    category: 'HVAC',
    contractType: 'Contract',
    rateMin: 68,
    rateMax: 88,
    durationWeeks: 16,
    hoursPerWeek: 40,
    requiredSkills: 'Hydronic systems, Plate heat exchangers, Pressure testing',
    preferredSkills: 'BMS controls, SCADA / Modbus telemetry',
    description: 'Lead mechanical connection and hydraulic balancing for secondary loop heat transfer substation.',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      postNewContract({
        ...formData,
        requiredSkills: formData.requiredSkills.split(',').map((s) => s.trim()),
        preferredSkills: formData.preferredSkills.split(',').map((s) => s.trim()),
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Post Infrastructure Contract"
      subtitle="Recruit skilled HVAC, piping, or commissioning talent for thermal energy projects"
      size="lg"
      ariaLabel="Post Infrastructure Contract Modal"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <Input
          label="Contract Title"
          placeholder="e.g. Plate Heat Exchanger Commissioning Specialist"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Hiring Organization / Site"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />

          <Input
            label="City / Location"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            options={JOB_CATEGORIES.slice(1)}
          />

          <Select
            label="Contract Type"
            value={formData.contractType}
            onChange={(e) => setFormData({ ...formData, contractType: e.target.value })}
            options={['Contract', 'Full-time']}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Input
            label="Min Rate ($/hr)"
            type="number"
            min={30}
            max={200}
            prefix="$"
            value={formData.rateMin}
            onChange={(e) => setFormData({ ...formData, rateMin: Number(e.target.value) })}
          />

          <Input
            label="Max Rate ($/hr)"
            type="number"
            min={30}
            max={250}
            prefix="$"
            value={formData.rateMax}
            onChange={(e) => setFormData({ ...formData, rateMax: Number(e.target.value) })}
          />

          <Input
            label="Duration (Wks)"
            type="number"
            min={2}
            max={104}
            value={formData.durationWeeks}
            onChange={(e) => setFormData({ ...formData, durationWeeks: Number(e.target.value) })}
          />

          <Input
            label="Hours/Week"
            type="number"
            min={10}
            max={60}
            value={formData.hoursPerWeek}
            onChange={(e) => setFormData({ ...formData, hoursPerWeek: Number(e.target.value) })}
          />
        </div>

        <Input
          label="Required Skills (comma-separated)"
          placeholder="Hydronic systems, Plate heat exchangers, Pressure testing"
          value={formData.requiredSkills}
          onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
        />

        <Input
          label="Preferred Skills (comma-separated)"
          placeholder="BMS controls, SCADA / Modbus telemetry"
          value={formData.preferredSkills}
          onChange={(e) => setFormData({ ...formData, preferredSkills: e.target.value })}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-tsecondary">Contract Description / Scope</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-card border border-border-subtle rounded-element p-3 text-sm text-tprimary focus:outline-none focus:border-thermal focus:ring-1 focus:ring-thermal"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border-subtle">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={isSubmitting}
            icon={Briefcase}
          >
            Post Contract
          </Button>
        </div>
      </form>
    </Modal>
  );
}
