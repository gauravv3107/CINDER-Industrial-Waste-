import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useMarketplace, CATEGORIES } from '../../context/MarketplaceContext';
import { PlusCircle } from 'lucide-react';

export function ListEquipmentModal({ isOpen, onClose }) {
  const { addListing } = useMarketplace();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Enterprise GPUs',
    condition: 'Tested · Grade A',
    grade: 'Grade A',
    startingBid: 8500,
    unitsAvailable: 2,
    belowNewPct: 40,
    location: 'Ashburn, VA',
    distanceKm: 3.5,
    seller: 'Enterprise Decom Group',
    specs: '80GB HBM, PCIe Gen5, 350W TDP',
    illustration: 'gpu',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addListing({
        ...formData,
        specs: formData.specs.split(',').map((s) => s.trim()),
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="List Enterprise Equipment"
      subtitle="Publish decommissioned GPUs, servers, or cooling infrastructure to the circular network"
      size="lg"
      ariaLabel="List Enterprise Equipment Modal"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <Input
          label="Equipment Title / Model"
          placeholder="e.g. NVIDIA H100 80GB SXM5 (Lot of 2)"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Hardware Category"
            value={formData.category}
            onChange={(e) => {
              const cat = e.target.value;
              let illus = 'gpu';
              if (cat === 'AI servers') illus = 'server';
              else if (cat === 'Liquid cooling rigs') illus = 'cdu';
              else if (cat === 'Power units' || cat === 'Server chassis') illus = 'server';
              setFormData({ ...formData, category: cat, illustration: illus });
            }}
            options={CATEGORIES.slice(1)}
          />

          <Select
            label="Tested Condition Grade"
            value={formData.condition}
            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
            options={[
              'Refurbished · Grade A',
              'Tested · Grade A',
              'Tested · Grade B',
            ]}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Starting Bid / Reserve (USD)"
            type="number"
            min={100}
            step={100}
            prefix="$"
            value={formData.startingBid}
            onChange={(e) => setFormData({ ...formData, startingBid: Number(e.target.value) })}
          />

          <Input
            label="Units Available"
            type="number"
            min={1}
            max={100}
            value={formData.unitsAvailable}
            onChange={(e) => setFormData({ ...formData, unitsAvailable: Number(e.target.value) })}
          />

          <Input
            label="Discount vs. New (%)"
            type="number"
            min={5}
            max={90}
            suffix="%"
            value={formData.belowNewPct}
            onChange={(e) => setFormData({ ...formData, belowNewPct: Number(e.target.value) })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Physical Warehouse Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />

          <Input
            label="Organization / Seller Name"
            value={formData.seller}
            onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
          />
        </div>

        <Input
          label="Key Specifications (comma-separated)"
          placeholder="80GB HBM3, SXM5 700W, NVLink 4.0, Cold Plate Included"
          value={formData.specs}
          onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
        />

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border-subtle">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={isSubmitting}
            icon={PlusCircle}
          >
            Publish Listing
          </Button>
        </div>
      </form>
    </Modal>
  );
}
