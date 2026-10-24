// ============================================================
// BLUELINE AUTO SERVICES LTD — Services & Pricing Data
// ============================================================

export const SERVICES = [
  {
    id: 1,
    slug: 'vehicle-sales',
    title: 'Vehicle Sales & Sourcing',
    shortDesc: 'Quality pre-owned cars, SUVs, and commercial vehicles inspected and prepared to high UK standards.',
    longDesc: 'At Blueline Auto Services Ltd, we source, inspect, and sell quality motor vehicles across Doncaster and the wider UK. Every vehicle undergoes a comprehensive multi-point mechanical inspection, full HPI background check, MOT preparation, and professional interior/exterior valeting before delivery.',
    icon: 'Car',
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=900&q=80',
    features: [
      'Comprehensive multi-point mechanical health check',
      'Full HPI & vehicle history verification',
      'Finance options & part-exchange available',
      'Warranty packages tailored to your peace of mind',
      'Nationwide UK vehicle delivery to your door',
      'Bespoke vehicle sourcing tailored to your budget'
    ]
  },
  {
    id: 2,
    slug: 'vehicle-hire',
    title: 'Vehicle & Commercial Hire',
    shortDesc: 'Flexible short-term and long-term rental options for personal cars, executive saloons, and commercial vans.',
    longDesc: 'Whether you require a dependable saloon car for business travel, an SUV for a family journey, or a panel van for commercial deliveries, Blueline provides flexible, competitive rental packages. All vehicles are modern, fully insured, and routinely serviced.',
    icon: 'Key',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=900&q=80',
    features: [
      'Short-term, weekend, and weekly rental rates',
      'Long-term corporate & fleet hire solutions',
      'Modern, fuel-efficient saloons, SUVs, and vans',
      'Full comprehensive insurance coverage available',
      '24/7 nationwide roadside breakdown cover included',
      'Collection and delivery service across South Yorkshire'
    ]
  },
  {
    id: 3,
    slug: 'servicing-mot',
    title: 'Vehicle Servicing & MOT',
    shortDesc: 'Interim, full, and major servicing following manufacturer guidelines using premium OEM-grade parts.',
    longDesc: 'Regular servicing preserves your vehicle’s performance, warranty, and resale value. Our skilled technicians handle all makes and models, carrying out interim and major services, oil & filter changes, fluid flushes, brake inspections, and full MOT testing and preparation.',
    icon: 'Settings',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&q=80',
    features: [
      'Interim, Full, and Major service packages',
      'MOT testing, pre-checks, and remedial rectifications',
      'High-grade synthetic oils and OEM quality filters',
      'Manufacturer warranty compliant procedures',
      'Digital service record updates & stamped logbooks',
      'Transparent estimates before any work commences'
    ]
  },
  {
    id: 4,
    slug: 'mechanical-repairs',
    title: 'Diagnostics & Mechanical Repairs',
    shortDesc: 'Advanced computer diagnostics, engine maintenance, clutch replacements, brakes, and suspension repairs.',
    longDesc: 'From persistent check engine lights and brake shudder to clutch replacements and gearbox diagnostics, our workshop is equipped with modern scan tools and precision machinery to diagnose and rectify faults accurately.',
    icon: 'Wrench',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    features: [
      'State-of-the-art ECU diagnostics & electrical troubleshooting',
      'Brake pads, discs, calipers, and ABS repairs',
      'Clutch, flywheel, and transmission repairs',
      'Suspension, shock absorbers, and steering alignment',
      'Exhaust systems, DPF regeneration, and catalytic converters',
      'Timing belt / chain inspection and replacement'
    ]
  },
  {
    id: 5,
    slug: 'recovery-transport',
    title: 'Vehicle Recovery & Transport',
    shortDesc: '24/7 rapid breakdown assistance, accident recovery, and safe nationwide vehicle transportation.',
    longDesc: 'Stranded on the road or need a vehicle transported securely across the UK? Our fleet of modern flatbed recovery trucks is available 24 hours a day, 7 days a week for roadside emergencies, breakdowns, and private vehicle transport.',
    icon: 'Truck',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=80',
    features: [
      '24/7 emergency roadside recovery and towing',
      'Damage-free flatbed transportation for all vehicle types',
      'Rapid response across Doncaster and South Yorkshire',
      'Direct transport to our repair workshop or your home',
      'Inter-city and nationwide vehicle collection & delivery',
      'Insurance accident recovery liaison'
    ]
  },
  {
    id: 6,
    slug: 'valeting-detailing',
    title: 'Valeting & Professional Detailing',
    shortDesc: 'Showroom-finish hand washing, machine polishing, interior sanitisation, and protective paint coatings.',
    longDesc: 'Restore your vehicle’s shine and preserve its exterior paintwork with our detailing experts. From quick express valets to comprehensive paint correction and ceramic paint sealants, we ensure your vehicle looks its absolute best.',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=900&q=80',
    features: [
      'Hand foam pre-wash, decontamination & wheel cleaning',
      'Deep interior steam cleaning, extraction & sanitisation',
      'Leather conditioning and fabric stain protection',
      'Machine polishing and swirl mark correction',
      'Hydrophobic ceramic coatings and paint protection sealants',
      'Full preparation packages for resale or end-of-lease'
    ]
  }
];

export const PRICE_LIST = [
  {
    category: 'Servicing & MOT',
    icon: 'Settings',
    items: [
      { name: 'Interim Service (Up to 2.0L)', price: '£95.00' },
      { name: 'Full Service (Comprehensive)', price: '£165.00' },
      { name: 'Major Service (Full Filters & Plugs)', price: '£220.00' },
      { name: 'MOT Test (Class 4 Cars)', price: '£45.00' },
      { name: 'Combined Interim Service + MOT', price: '£130.00' },
      { name: 'Combined Full Service + MOT', price: '£195.00' },
      { name: 'Air Conditioning Re-gas (R134a)', price: '£65.00' },
      { name: 'Air Conditioning Re-gas (R1234yf)', price: '£110.00' },
    ]
  },
  {
    category: 'Diagnostics & Repairs',
    icon: 'Wrench',
    items: [
      { name: 'Comprehensive Computer Diagnostic Scan', price: '£45.00' },
      { name: 'Brake Pads Replacement (Front or Rear)', price: 'From £75.00' },
      { name: 'Brake Discs & Pads (Front or Rear)', price: 'From £145.00' },
      { name: 'Battery Testing & Replacement', price: 'From £85.00' },
      { name: 'Wheel Alignment & Balancing (4-Wheel Laser)', price: '£50.00' },
      { name: 'Clutch Replacement', price: 'From £295.00' },
      { name: 'Timing Belt / Water Pump Replacement', price: 'From £245.00' },
      { name: 'Suspension & Shock Absorber Repairs', price: 'From £95.00' },
    ]
  },
  {
    category: 'Vehicle Hire',
    icon: 'Key',
    items: [
      { name: 'Economy Hatchback (Per Day)', price: '£35.00 / day' },
      { name: 'Saloon / Sedan (Per Day)', price: '£45.00 / day' },
      { name: 'Mid-Size / Family SUV (Per Day)', price: '£55.00 / day' },
      { name: 'Small Panel Van (Short Wheelbase)', price: '£50.00 / day' },
      { name: 'Large Luton Van (Tail Lift Included)', price: '£75.00 / day' },
      { name: 'Weekly Hire Discount (7+ Days)', price: '15% Off' },
      { name: 'Long Term Monthly Corporate Lease', price: 'From £350.00 / mo' },
    ]
  },
  {
    category: 'Valeting & Detailing',
    icon: 'Sparkles',
    items: [
      { name: 'Express Wash & Interior Vac', price: '£25.00' },
      { name: 'Mini Valet (Interior & Exterior)', price: '£45.00' },
      { name: 'Full Valet (Upholstery Shampoo & Polish)', price: '£85.00' },
      { name: 'Paint Correction & Machine Polish', price: 'From £150.00' },
      { name: 'Ceramic Coating Paint Protection (12-Month)', price: 'From £220.00' },
      { name: 'Commercial Van Deep Valet', price: 'From £70.00' },
    ]
  },
  {
    category: 'Recovery & Transport',
    icon: 'AlertTriangle',
    items: [
      { name: 'Local Breakdown Recovery (Doncaster Area)', price: 'From £60.00' },
      { name: 'Emergency Call-out (Out of Hours)', price: 'From £85.00' },
      { name: 'Nationwide Vehicle Transport (Per Loaded Mile)', price: '£1.80 / mile' },
      { name: 'Accident Recovery & Secure Storage', price: 'From £120.00' },
      { name: 'Auction / Dealership Vehicle Collection', price: 'From £75.00' },
    ]
  }
];
