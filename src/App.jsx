import React, { useState, useEffect } from 'react';
import { Ship, Wind, Target, AlertCircle, Flame, Heart, Skull, Plus, Trash2, Navigation, Anchor, Swords, Users } from 'lucide-react';

// === MAST STRUCTURES ===

const MAST_STRUCTURES = {
  'three-masted': {
    masts: ['Fore', 'Main', 'Mizzen', 'Bowsprit'],
    layouts: {
      10: [
        { name: 'Fore Course', mast: 'Fore', section: 0 },
        { name: 'Fore Topsail', mast: 'Fore', section: 1 },
        { name: 'Fore Topgallant', mast: 'Fore', section: 2 },
        { name: 'Main Course', mast: 'Main', section: 0 },
        { name: 'Main Topsail', mast: 'Main', section: 1 },
        { name: 'Main Topgallant', mast: 'Main', section: 2 },
        { name: 'Spanker', mast: 'Mizzen', section: 0 },
        { name: 'Mizzen Topsail', mast: 'Mizzen', section: 1 },
        { name: 'Mizzen Topgallant', mast: 'Mizzen', section: 2 },
        { name: 'Jib', mast: 'Bowsprit', section: 0 }
      ],
      9: [
        { name: 'Fore Course', mast: 'Fore', section: 0 },
        { name: 'Fore Topsail', mast: 'Fore', section: 1 },
        { name: 'Fore Topgallant', mast: 'Fore', section: 2 },
        { name: 'Main Course', mast: 'Main', section: 0 },
        { name: 'Main Topsail', mast: 'Main', section: 1 },
        { name: 'Main Topgallant', mast: 'Main', section: 2 },
        { name: 'Spanker', mast: 'Mizzen', section: 0 },
        { name: 'Mizzen Topsail', mast: 'Mizzen', section: 1 },
        { name: 'Jib', mast: 'Bowsprit', section: 0 }
      ],
      8: [
        { name: 'Fore Course', mast: 'Fore', section: 0 },
        { name: 'Fore Topsail', mast: 'Fore', section: 1 },
        { name: 'Fore Topgallant', mast: 'Fore', section: 2 },
        { name: 'Main Course', mast: 'Main', section: 0 },
        { name: 'Main Topsail', mast: 'Main', section: 1 },
        { name: 'Main Topgallant', mast: 'Main', section: 2 },
        { name: 'Spanker', mast: 'Mizzen', section: 0 },
        { name: 'Jib', mast: 'Bowsprit', section: 0 }
      ]
    }
  },
  'two-masted': {
    masts: ['Fore', 'Main', 'Bowsprit'],
    layouts: {
      7: [
        { name: 'Fore Course', mast: 'Fore', section: 0 },
        { name: 'Fore Topsail', mast: 'Fore', section: 1 },
        { name: 'Fore Topgallant', mast: 'Fore', section: 2 },
        { name: 'Main Course', mast: 'Main', section: 0 },
        { name: 'Main Topsail', mast: 'Main', section: 1 },
        { name: 'Main Topgallant', mast: 'Main', section: 2 },
        { name: 'Jib', mast: 'Bowsprit', section: 0 }
      ],
      6: [
        { name: 'Fore Course', mast: 'Fore', section: 0 },
        { name: 'Fore Topsail', mast: 'Fore', section: 1 },
        { name: 'Main Course', mast: 'Main', section: 0 },
        { name: 'Main Topsail', mast: 'Main', section: 1 },
        { name: 'Driver', mast: 'Main', section: 2 },
        { name: 'Jib', mast: 'Bowsprit', section: 0 }
      ],
      5: [
        { name: 'Fore Course', mast: 'Fore', section: 0 },
        { name: 'Fore Topsail', mast: 'Fore', section: 1 },
        { name: 'Main Course', mast: 'Main', section: 0 },
        { name: 'Main Topsail', mast: 'Main', section: 1 },
        { name: 'Jib', mast: 'Bowsprit', section: 0 }
      ],
      4: [
        { name: 'Fore Course', mast: 'Fore', section: 0 },
        { name: 'Fore Topsail', mast: 'Fore', section: 1 },
        { name: 'Main Course', mast: 'Main', section: 0 },
        { name: 'Main Topsail', mast: 'Main', section: 1 }
      ],
      3: [
        { name: 'Fore Course', mast: 'Fore', section: 0 },
        { name: 'Main Course', mast: 'Main', section: 0 },
        { name: 'Jib', mast: 'Bowsprit', section: 0 }
      ],
      2: [
        { name: 'Fore Course', mast: 'Fore', section: 0 },
        { name: 'Main Course', mast: 'Main', section: 0 }
      ]
    }
  },
  'single-masted': {
    masts: ['Main', 'Bowsprit'],
    layouts: {
      4: [
        { name: 'Main Course', mast: 'Main', section: 0 },
        { name: 'Main Topsail', mast: 'Main', section: 1 },
        { name: 'Main Topgallant', mast: 'Main', section: 2 },
        { name: 'Jib', mast: 'Bowsprit', section: 0 }
      ],
      2: [
        { name: 'Main Course', mast: 'Main', section: 0 },
        { name: 'Jib', mast: 'Bowsprit', section: 0 }
      ],
      1: [
        { name: 'Main Course', mast: 'Main', section: 0 }
      ]
    }
  }
};

const getMastStructure = (shipClass) => {
  if (shipClass.includes('1st') || shipClass.includes('2nd') || 
      shipClass.includes('3rd') || shipClass.includes('4th') || 
      shipClass.includes('5th') || shipClass.includes('6th') ||
      shipClass.includes('Large Frigates')) {
    return 'three-masted';
  }
  if (shipClass.includes('Sloops') || shipClass.includes('Brigs') || 
      shipClass.includes('Snows') || shipClass.includes('Xebecs')) {
    return 'two-masted';
  }
  if (shipClass.includes('Cutters') || shipClass.includes('Gunboats') || 
      shipClass.includes('Trabacolos')) {
    return 'single-masted';
  }
  return 'two-masted';
};

const GUN_TYPES = [
  "48# Long", "42# Long", "36# Long", "32# Long", "30# Long", "29# Long",
  "24# Long", "18# Long", "12# Long", "9# Long", "8# Long", "6# Long", "4# Long", "3# Long", "1/2# Swivel",
  "68# Carronade", "42# Carronade", "36# Carronade", "32# Carronade", "24# Carronade",
  "18# Carronade", "12# Carronade"
];

const RANGE_BANDS = {
  "48# Long": { PB: [0, 2], Close: [2.1, 23], Medium: [23.1, 41], Long: [41.1, 63], Extreme: [63.1, 150] },
  "42# Long": { PB: [0, 2], Close: [2.1, 23], Medium: [23.1, 41], Long: [41.1, 63], Extreme: [63.1, 150] },
  "36# Long": { PB: [0, 2], Close: [2.1, 23], Medium: [23.1, 41], Long: [41.1, 63], Extreme: [63.1, 150] },
  "32# Long": { PB: [0, 2], Close: [2.1, 23], Medium: [23.1, 43], Long: [43.1, 66], Extreme: [66.1, 158] },
  "30# Long": { PB: [0, 2], Close: [2.1, 23], Medium: [23.1, 43], Long: [43.1, 66], Extreme: [66.1, 158] },
  "24# Long": { PB: [0, 2], Close: [2.1, 23], Medium: [23.1, 52], Long: [52.1, 79], Extreme: [79.1, 188] },
  "18# Long": { PB: [0, 2], Close: [2.1, 25], Medium: [25.1, 54], Long: [54.1, 82], Extreme: [82.1, 195] },
  "12# Long": { PB: [0, 2], Close: [2.1, 20], Medium: [20.1, 40], Long: [40.1, 60], Extreme: [60.1, 143] },
  "9# Long": { PB: [0, 2], Close: [2.1, 19], Medium: [19.1, 37], Long: [37.1, 57], Extreme: [57.1, 135] },
  "8# Long": { PB: [0, 2], Close: [2.1, 18], Medium: [18.1, 36], Long: [36.1, 54], Extreme: [54.1, 128] },
  "6# Long": { PB: [0, 2], Close: [2.1, 19], Medium: [19.1, 37], Long: [37.1, 57], Extreme: [57.1, 135] },
  "4# Long": { PB: [0, 2], Close: [2.1, 16], Medium: [16.1, 32], Long: [32.1, 48], Extreme: [48.1, 115] },
  "3# Long": { PB: [0, 2], Close: [2.1, 15], Medium: [15.1, 30], Long: [30.1, 45], Extreme: [45.1, 107] },
  "1/2# Swivel": { PB: [0, 2], Close: [2.1, 8], Medium: [8.1, 15], Long: [15.1, 23], Extreme: [23.1, 54] },
  "68# Carronade": { PB: [0, 2], Close: [2.1, 14], Medium: [14.1, 23], Long: [23.1, 35], Extreme: [35.1, 94] },
  "42# Carronade": { PB: [0, 2], Close: [2.1, 14], Medium: [14.1, 21], Long: [21.1, 32], Extreme: [32.1, 86] },
  "32# Carronade": { PB: [0, 2], Close: [2.1, 10], Medium: [10.1, 20], Long: [20.1, 30], Extreme: [30.1, 83] }
};

const RANGE_MODIFIERS = { PB: 1.0, Close: 1.0, Medium: 0.54, Long: 0.40, Extreme: 0.07 };
const SHOT_MODIFIERS = { Ball: 1.0, Double: 1.25, Dismantling: 2.5, Grape: 1.5, Canister: 2.5 };

// ALL 37 HISTORICAL NATIONALITY MODIFIERS
const NATIONALITY_MODIFIERS = {
  "Denmark 1801": 0.65,
  "Denmark 1807": 0.76,
  "France - Royal Navy 1778-91": 0.91,
  "France - Republican Navy 1792-1801": 0.38,
  "France - Imperial Navy 1803-1815": 0.58,
  "France - Privateers 1792-1801": 0.34,
  "France - Privateers 1803-1815": 0.59,
  "Great Britain - Royal Navy 1775-1815": 1.00,
  "Great Britain - Captain Broke Shannon 1813": 1.14,
  "Great Britain - Mail Packets 1812-15": 0.44,
  "Hapsburg Empire": 0.42,
  "Kingdom of Italy 1803-1815": 0.45,
  "Kingdom of Naples 1806-15": 0.40,
  "Kingdom of Sardinia 1792-1801": 0.41,
  "Kingdom of Sardinia 1803-1815": 0.48,
  "Kingdom of the Two Sicilies 1792-1801": 0.40,
  "Kingdom of the Two Sicilies 1803-1815": 0.47,
  "Ottoman Empire 1792-1815": 0.15,
  "Portugal 1775-1801": 0.24,
  "Portugal 1803-15": 0.37,
  "Republic of Batavia 1796-1801": 0.43,
  "Republic of Batavia 1803-1814": 0.49,
  "Republic of Liguria": 0.27,
  "Republic of Venice 1792-1797": 0.45,
  "Russia 1788-1801": 0.44,
  "Russia 1803-15": 0.51,
  "Spain - Navy 1775-83": 0.36,
  "Spain - Navy 1792-1801": 0.41,
  "Spain - Navy 1803-1815": 0.48,
  "Spanish Privateers 1792-1801": 0.38,
  "Spanish Privateers 1803-1815": 0.44,
  "Sweden 1788-1801": 0.46,
  "Sweden 1803-1815": 0.54,
  "United Provinces of the Netherlands 1780-1795": 1.00,
  "U.S. Continental Navy 1775-1783": 0.50,
  "U.S. Navy 1798-1811": 0.90,
  "U.S. Navy 1812-15": 1.00,
  "U.S. Navy Lawrence Chesapeake 1813": 0.90
};

const GUN_CREW_SIZES = {
  "48# Long": 14, "42# Long": 14, "36# Long": 12, "32# Long": 12, "30# Long": 12, "29# Long": 12,
  "24# Long": 10, "18# Long": 8, "12# Long": 8, "9# Long": 6, "8# Long": 6, "6# Long": 4, "4# Long": 4, "3# Long": 3, "1/2# Swivel": 2,
  "68# Carronade": 4, "42# Carronade": 4, "36# Carronade": 4, "32# Carronade": 4, 
  "24# Carronade": 3, "18# Carronade": 3, "12# Carronade": 2
};

// Helper function to parse gun poundage from gun type string
// Handles regular numbers (e.g., "24# Long" → 24) and fractions (e.g., "1/2# Swivel" → 0.5)
const parseGunPoundage = (gunType) => {
  const fractionMatch = gunType.match(/(\d+)\/(\d+)#/);
  if (fractionMatch) {
    return parseFloat(fractionMatch[1]) / parseFloat(fractionMatch[2]);
  }
  const numberMatch = gunType.match(/\d+/);
  return numberMatch ? parseInt(numberMatch[0]) : 0;
};

// Helper function to get maximum range for a gun type
const getMaxRange = (gunType) => {
  const bands = RANGE_BANDS[gunType];
  if (!bands) return 0;
  return bands.Extreme[1];
};

// COMPLETE MOVEMENT TABLES WITH DRIFTING
const MOVEMENT_TABLES = {
  "1st & 2nd rates": {
    "Slight breeze": { QR: 90, Ru: 73, RN: 68, B: 46, D: 18 },
    "Light breeze": { QR: 181, Ru: 145, RN: 135, B: 90, D: 36 },
    "Gentle breeze": { QR: 247, Ru: 200, RN: 186, B: 124, D: 50 },
    "Moderate breeze": { QR: 318, Ru: 253, RN: 240, B: 158, D: 64 },
    "Fresh breeze": { QR: 453, Ru: 363, RN: 340, B: 228, D: 90 },
    "Gale": { QR: 272, Ru: 218, RN: 206, B: 136, D: 55 }
  },
  "3rd rates": {
    "Slight breeze": { QR: 101, Ru: 80, RN: 77, B: 50, D: 21 },
    "Light breeze": { QR: 203, Ru: 163, RN: 152, B: 101, D: 40 },
    "Gentle breeze": { QR: 272, Ru: 218, RN: 206, B: 136, D: 55 },
    "Moderate breeze": { QR: 340, Ru: 272, RN: 256, B: 172, D: 68 },
    "Fresh breeze": { QR: 475, Ru: 380, RN: 358, B: 240, D: 95 },
    "Gale": { QR: 272, Ru: 218, RN: 206, B: 136, D: 55 }
  },
  "4th rates": {
    "Slight breeze": { QR: 114, Ru: 90, RN: 86, B: 58, D: 24 },
    "Light breeze": { QR: 228, Ru: 181, RN: 173, B: 117, D: 46 },
    "Gentle breeze": { QR: 296, Ru: 235, RN: 223, B: 149, D: 61 },
    "Moderate breeze": { QR: 363, Ru: 290, RN: 272, B: 181, D: 73 },
    "Fresh breeze": { QR: 499, Ru: 395, RN: 374, B: 250, D: 105 },
    "Gale": { QR: 250, Ru: 200, RN: 189, B: 127, D: 50 }
  },
  "Large Frigates": {
    "Slight breeze": { QR: 186, Ru: 147, RN: 140, B: 94, D: 39 },
    "Light breeze": { QR: 236, Ru: 187, RN: 178, B: 118, D: 49 },
    "Gentle breeze": { QR: 412, Ru: 326, RN: 308, B: 205, D: 85 },
    "Moderate breeze": { QR: 537, Ru: 425, RN: 406, B: 272, D: 112 },
    "Fresh breeze": { QR: 634, Ru: 502, RN: 478, B: 319, D: 132 },
    "Gale": { QR: 280, Ru: 221, RN: 210, B: 140, D: 58 }
  },
  "5th & 6th rates": {
    "Slight breeze": { QR: 225, Ru: 178, RN: 172, B: 114, D: 47 },
    "Light breeze": { QR: 268, Ru: 212, RN: 201, B: 136, D: 56 },
    "Gentle breeze": { QR: 389, Ru: 308, RN: 295, B: 198, D: 81 },
    "Moderate breeze": { QR: 485, Ru: 383, RN: 367, B: 247, D: 102 },
    "Fresh breeze": { QR: 586, Ru: 462, RN: 443, B: 299, D: 124 },
    "Gale": { QR: 268, Ru: 212, RN: 201, B: 136, D: 56 }
  },
  "Sloops (Corvettes) and Xebecs": {
    "Slight breeze": { QR: 207, Ru: 164, RN: 157, B: 105, D: 43 },
    "Light breeze": { QR: 268, Ru: 212, RN: 201, B: 136, D: 56 },
    "Gentle breeze": { QR: 451, Ru: 357, RN: 340, B: 229, D: 95 },
    "Moderate breeze": { QR: 586, Ru: 462, RN: 441, B: 299, D: 124 },
    "Fresh breeze": { QR: 537, Ru: 425, RN: 406, B: 272, D: 112 },
    "Gale": { QR: 207, Ru: 164, RN: 157, B: 105, D: 44 }
  },
  "Brigs, Snows, Pojamas, Gondolas, Ketches, Galleys, Polaccas": {
    "Slight breeze": { QR: 104, Ru: 81, RN: 78, B: 53, D: 22 },
    "Light breeze": { QR: 138, Ru: 110, RN: 104, B: 70, D: 30 },
    "Gentle breeze": { QR: 229, Ru: 181, RN: 173, B: 114, D: 49 },
    "Moderate breeze": { QR: 320, Ru: 250, RN: 240, B: 160, D: 70 },
    "Fresh breeze": { QR: 456, Ru: 364, RN: 342, B: 229, D: 92 },
    "Gale": { QR: 92, Ru: 73, RN: 70, B: 47, D: 18 }
  },
  "Trabacolos, Baghalas, Dohws, Schooners, Luggers, Cutters, Gunboats, Galivats, Proas, Batils, Colonial Trade Sloops": {
    "Slight breeze": { QR: 244, Ru: 192, RN: 183, B: 124, D: 50 },
    "Light breeze": { QR: 327, Ru: 259, RN: 247, B: 167, D: 70 },
    "Gentle breeze": { QR: 389, Ru: 308, RN: 295, B: 198, D: 81 },
    "Moderate breeze": { QR: 451, Ru: 357, RN: 340, B: 229, D: 95 },
    "Fresh breeze": { QR: 537, Ru: 425, RN: 406, B: 274, D: 112 },
    "Gale": { QR: 207, Ru: 164, RN: 157, B: 105, D: 44 }
  }
};

const WIND_STRENGTHS = ["Slight breeze", "Light breeze", "Gentle breeze", "Moderate breeze", "Fresh breeze", "Gale"];

const COMPASS_POINTS = ["N","N by E","NNE","NE by N","NE","NE by E","ENE","E by N","E","E by S","ESE","SE by E","SE","SE by S","SSE","S by E","S","S by W","SSW","SW by S","SW","SW by W","WSW","W by S","W","W by N","WNW","NW by W","NW","NW by N","NNW","N by W"];

const DEFAULT_SHIP_FORM = {
  name: 'HMS Victory',
  class: '1st & 2nd rates',
  tonnage: 2200,
  sails: 10,
  crew: 850,
  crewQuality: 'Experienced',
  nationality: 'Great Britain - Royal Navy 1775-1815',
  guns: [{ type: '32# Long', poundage: 32, count: 60 }],
  bowChasers: { type: '12# Long', poundage: 12, count: 2 },
  sternChasers: { type: '12# Long', poundage: 12, count: 2 }
};

// ============================================================================
// V8 CONSTANTS - ENHANCED SYSTEMS
// ============================================================================

// ENHANCED FIRE SYSTEM - Fire Spreading Chances (L.4.1)
const FIRE_SPREAD_CHANCES = {
  "Slight breeze": 15,
  "Light breeze": 25,
  "Gentle breeze": 35,
  "Moderate breeze": 45,
  "Fresh breeze": 60,
  "Gale": 60
};

// ENHANCED FIRE SYSTEM - Magazine Explosion Risk (L.4.3 - CORRECTED to BTQ 2025)
const MAGAZINE_EXPLOSION_RISK = {
  1: 0, 2: 0, 3: 0,     // Game turns 1-3: None
  4: 5,                  // Game turn 4: 1-5 (5%)
  5: 10,                 // Game turn 5: 1-10 (10%)
  6: 20,                 // Game turn 6: 1-20 (20%)
  7: 35,                 // Game turn 7: 1-35 (35%)
  8: 50, 9: 50           // Game turn 8+: 1-50 (50%)
};

// BOARDING SYSTEM - Nationality Boarding Casualty Factor Tables (H.3)
const BOARDING_CASUALTY_TABLES = {
  "United States 1775-1815": [
    { min: 76, max: 100, casualties: 2 },
    { min: 56, max: 75, casualties: 3 },
    { min: 26, max: 55, casualties: 6 },
    { min: 1, max: 25, casualties: 12 }
  ],
  "Great Britain - Royal Navy 1775-1815": [
    { min: 82, max: 100, casualties: 3 },
    { min: 34, max: 81, casualties: 6 },
    { min: 25, max: 33, casualties: 9 },
    { min: 1, max: 24, casualties: 12 }
  ],
  "France - Imperial Navy 1803-1815": [
    { min: 82, max: 100, casualties: 9 },
    { min: 73, max: 81, casualties: 15 },
    { min: 37, max: 72, casualties: 18 },
    { min: 1, max: 36, casualties: 39 }
  ],
  "Spain 1792-1808": [
    { min: 84, max: 100, casualties: 9 },
    { min: 67, max: 83, casualties: 24 },
    { min: 50, max: 66, casualties: 30 },
    { min: 1, max: 49, casualties: 45 }
  ],
  "Portugal": [
    { min: 84, max: 100, casualties: 9 },
    { min: 67, max: 83, casualties: 24 },
    { min: 50, max: 66, casualties: 30 },
    { min: 1, max: 49, casualties: 45 }
  ],
  "Holland": [
    { min: 82, max: 100, casualties: 9 },
    { min: 73, max: 81, casualties: 15 },
    { min: 37, max: 72, casualties: 18 },
    { min: 1, max: 36, casualties: 39 }
  ],
  "Sweden": [
    { min: 82, max: 100, casualties: 6 },
    { min: 34, max: 81, casualties: 9 },
    { min: 25, max: 33, casualties: 11 },
    { min: 1, max: 24, casualties: 18 }
  ],
  "Denmark": [
    { min: 82, max: 100, casualties: 6 },
    { min: 34, max: 81, casualties: 9 },
    { min: 25, max: 33, casualties: 11 },
    { min: 1, max: 24, casualties: 18 }
  ],
  "Russia 1792-1815": [
    { min: 82, max: 100, casualties: 6 },
    { min: 34, max: 81, casualties: 9 },
    { min: 25, max: 33, casualties: 11 },
    { min: 1, max: 24, casualties: 18 }
  ],
  "_default": [
    { min: 81, max: 100, casualties: 15 },
    { min: 61, max: 80, casualties: 30 },
    { min: 41, max: 60, casualties: 39 },
    { min: 1, max: 40, casualties: 45 }
  ]
};

export default function BTQCompanion() {
  const [activeTab, setActiveTab] = useState('ships');
  const [ships, setShips] = useState([]);
  const [shipForm, setShipForm] = useState(DEFAULT_SHIP_FORM);
  const [turn, setTurn] = useState(1);
  const [wind, setWind] = useState({ strength: 'Gentle breeze', direction: 'N' });
  const [log, setLog] = useState([]);
  const [shipAddedMessage, setShipAddedMessage] = useState('');
  const [usePercentTurnPenalty, setUsePercentTurnPenalty] = useState(false);
  const [gunneryForm, setGunneryForm] = useState({
    firingShipId: '',
    targetShipId: '',
    arc: 'Port',
    targetLocation: 'Port',
    distance: 10,
    shotType: 'Ball',
    aimType: 'Hull',
    rakeType: 'None',
    useInitialBroadside: true,
    halfDamage: false
  });
  const [lastGunneryResult, setLastGunneryResult] = useState(null);
  const [previousTurnState, setPreviousTurnState] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);
  
  // V8 STATE
  const [useEnhancedFire, setUseEnhancedFire] = useState(true);
  const [usePvnSurrender, setUsePvnSurrender] = useState(false);
  const [useReducedCrewDamage, setUseReducedCrewDamage] = useState(false);
  const [useModifiedShot, setUseModifiedShot] = useState(false);

  const addLog = (message, type = 'info') => {
    setLog(prev => [...prev, { id: Date.now() + Math.random(), message, type, turn }]);
  };

  // Apply PVN penalties when option is enabled
  useEffect(() => {
    if (usePvnSurrender && ships.length >= 2) {
      const updatedShips = calculatePvnPenalties(ships);
      // Only update if penalties were actually applied (check if any ship changed)
      const hasChanges = updatedShips.some((ship, idx) => ship.sp !== ships[idx].sp);
      if (hasChanges) {
        setShips(updatedShips);
      }
    }
  }, [usePvnSurrender]); // Only run when the option is toggled

  const calculateDerivedStats = (form) => {
    const hvn = form.tonnage * 2;
    const svn = Math.round(hvn / (1.3 * form.sails));
    const totalGuns = form.guns.reduce((sum, g) => sum + g.count, 0) + 
                      form.bowChasers.count + form.sternChasers.count;
    
    // GDN = HVN / Total Guns (BTQ correct formula)
    const gdn = Math.round(hvn / totalGuns);
    
    const totalPoundage = form.guns.reduce((sum, g) => sum + (g.poundage * g.count), 0);
    const lgbwn = Math.round(totalPoundage / 4);
    const cbwn = Math.round(hvn / 40);
    
    // Calculate broadside (carronades count as half for PVN)
    const broadside = form.guns.reduce((sum, g) => {
      const poundage = g.type.includes('Carronade') ? g.poundage / 2 : g.poundage;
      return sum + (poundage * g.count);
    }, 0) + 
    (form.bowChasers.type.includes('Carronade') ? form.bowChasers.poundage / 2 : form.bowChasers.poundage) * form.bowChasers.count +
    (form.sternChasers.type.includes('Carronade') ? form.sternChasers.poundage / 2 : form.sternChasers.poundage) * form.sternChasers.count;
    
    const nationalityMod = NATIONALITY_MODIFIERS[form.nationality] || 1.0;
    const pvn = Math.round(broadside * nationalityMod * form.tonnage);
    
    return { hvn, svn, gdn, lgbwn, cbwn, pvn };
  };

  // Calculate PVN-based surrender penalties (BTQ 6.95 & 6.96)
  const calculatePvnPenalties = (currentShips) => {
    if (!usePvnSurrender || currentShips.length < 2) return currentShips;
    
    return currentShips.map(ship => {
      // Find all enemy ships (different team/faction - for now, compare against all others)
      const enemyShips = currentShips.filter(s => s.id !== ship.id);
      if (enemyShips.length === 0) return ship;
      
      // Calculate total enemy PVN
      const totalEnemyPvn = enemyShips.reduce((sum, s) => sum + s.pvn, 0);
      
      // Calculate ratio (enemy PVN to this ship's PVN)
      const ratio = totalEnemyPvn / ship.pvn;
      
      let spPenalty = 0;
      
      // Apply penalties based on scenario type
      if (currentShips.length === 2) {
        // Single Ship Action (6.95)
        if (ratio >= 7.0) spPenalty = 10;
        else if (ratio >= 6.0) spPenalty = 9;
        else if (ratio >= 5.0) spPenalty = 8;
        else if (ratio >= 4.0) spPenalty = 7;
        else if (ratio >= 3.0) spPenalty = 6;
        else if (ratio >= 2.0) spPenalty = 5;
        else if (ratio >= 1.5) spPenalty = 4;
        else if (ratio >= 1.1) spPenalty = 3;
        // else 0
      } else {
        // Multiple Ship Action - Unsupported Ship (6.96)
        if (ratio >= 5.0) spPenalty = 5;
        else if (ratio >= 4.0) spPenalty = 4;
        else if (ratio >= 3.0) spPenalty = 3;
        else if (ratio >= 2.0) spPenalty = 2;
        // else 0
      }
      
      // Track if we already applied this penalty
      if (!ship.pvnPenaltyApplied && spPenalty > 0) {
        const newSp = Math.max(0, ship.sp - spPenalty);
        addLog(`⚖️ ${ship.name}: -${spPenalty} SP (PVN ratio ${ratio.toFixed(2)}:1)`, 'info');
        return { ...ship, sp: newSp, pvnPenaltyApplied: true };
      }
      
      return ship;
    });
  };

  // Check if ship is a two-decker (has lower gunports)
  const isTwoDeckerShip = (shipClass) => {
    return shipClass.includes('1st') || 
           shipClass.includes('2nd') || 
           shipClass.includes('3rd') || 
           shipClass.includes('4th');
  };

  // Check if weather prevents lower gunports from opening
  const isHeavyWeather = (windStrength) => {
    return windStrength === 'Fresh breeze' || windStrength === 'Gale';
  };

  // Identify lower deck guns (heaviest caliber long guns, not carronades)
  const getLowerDeckGuns = (ship) => {
    // Get all long guns (not carronades) from all arcs
    const allLongGuns = [];
    Object.entries(ship.arcs).forEach(([arc, guns]) => {
      guns.forEach(gun => {
        if (!gun.type.includes('Carronade')) {
          allLongGuns.push({ ...gun, arc });
        }
      });
    });

    if (allLongGuns.length === 0) return [];

    // Find the heaviest poundage (lower deck guns are the heaviest)
    const maxPoundage = Math.max(...allLongGuns.map(g => g.poundage));
    
    // Return all guns with max poundage (these are lower deck)
    return allLongGuns.filter(g => g.poundage === maxPoundage);
  };

  const getRangeBand = (gunType, distance) => {
    const bands = RANGE_BANDS[gunType];
    if (!bands) return 'Out of Range';
    if (distance <= bands.PB[1]) return 'PB';
    if (distance <= bands.Close[1]) return 'Close';
    if (distance <= bands.Medium[1]) return 'Medium';
    if (distance <= bands.Long[1]) return 'Long';
    if (distance <= bands.Extreme[1]) return 'Extreme';
    return 'Out of Range';
  };

  const canFireShot = (shotType, rangeBand, aimType) => {
    if (shotType === 'Dismantling' && aimType !== 'Rigging') return false;
    if ((shotType === 'Grape' || shotType === 'Canister') && aimType !== 'Crew') return false;
    if (rangeBand === 'Long' || rangeBand === 'Extreme') {
      if (shotType === 'Double' || shotType === 'Dismantling') return false;
    }
    if (rangeBand === 'Medium' || rangeBand === 'Long' || rangeBand === 'Extreme') {
      if (shotType === 'Grape' || shotType === 'Canister') return false;
    }
    return true;
  };

  const executeGunnery = () => {
    const firingShip = ships.find(s => s.id === gunneryForm.firingShipId);
    const targetShip = ships.find(s => s.id === gunneryForm.targetShipId);

    if (!firingShip || !targetShip) {
      addLog('⚠️ Select both ships', 'error');
      return;
    }
    
    // Check if magazine is flooded
    if (firingShip.magazineFlooded) {
      addLog(`⚠️ ${firingShip.name}: Magazine flooded - cannot fire guns!`, 'error');
      return;
    }

    const { arc, targetLocation, distance, shotType, aimType, rakeType, useInitialBroadside } = gunneryForm;

    // Validate shot type / aim type combination BEFORE checking guns
    if (shotType === 'Dismantling' && aimType !== 'Rigging') {
      addLog(`⚠️ Dismantling shot can only be fired at Rigging, not ${aimType}`, 'error');
      return;
    }
    if ((shotType === 'Grape' || shotType === 'Canister') && aimType !== 'Crew') {
      addLog(`⚠️ ${shotType} shot can only be fired at Crew, not ${aimType}`, 'error');
      return;
    }

    // Check range restrictions for shot types
    const firstGunType = firingShip.arcs[arc]?.find(g => g.count > 0)?.type;
    if (firstGunType) {
      const testRangeBand = getRangeBand(firstGunType, distance);
      
      if (testRangeBand === 'Long' || testRangeBand === 'Extreme') {
        if (shotType === 'Double') {
          addLog(`⚠️ Double shot cannot be fired at ${testRangeBand} range (max: Close)`, 'error');
          return;
        }
        if (shotType === 'Dismantling') {
          addLog(`⚠️ Dismantling shot cannot be fired at ${testRangeBand} range (max: Medium)`, 'error');
          return;
        }
      }
      
      if (testRangeBand === 'Medium' || testRangeBand === 'Long' || testRangeBand === 'Extreme') {
        if (shotType === 'Grape') {
          addLog(`⚠️ Grape shot cannot be fired at ${testRangeBand} range (max: Close)`, 'error');
          return;
        }
        if (shotType === 'Canister') {
          addLog(`⚠️ Canister shot cannot be fired at ${testRangeBand} range (max: Close)`, 'error');
          return;
        }
      }
    }

    let availableGuns = firingShip.arcs[arc]?.filter(g => g.count > 0) || [];
    if (availableGuns.length === 0) {
      addLog(`⚠️ No guns in ${arc} arc`, 'error');
      return;
    }

    // HEAVY WEATHER RULE: Lower gunports closed on two-deckers in Fresh breeze or Gale
    let lowerDeckRestriction = false;
    if (isTwoDeckerShip(firingShip.class) && isHeavyWeather(wind.strength)) {
      const lowerDeckGuns = getLowerDeckGuns(firingShip);
      const lowerDeckPoundage = lowerDeckGuns.length > 0 ? lowerDeckGuns[0].poundage : 0;
      
      if (lowerDeckPoundage > 0) {
        // Filter out lower deck guns (heaviest long guns)
        const filteredGuns = availableGuns.filter(gun => {
          return gun.type.includes('Carronade') || gun.poundage < lowerDeckPoundage;
        });
        
        if (filteredGuns.length < availableGuns.length) {
          const excludedCount = availableGuns.filter(g => 
            !g.type.includes('Carronade') && g.poundage === lowerDeckPoundage
          ).reduce((sum, g) => sum + g.count, 0);
          
          addLog(`🌊 ${firingShip.name}: Lower gunports closed in ${wind.strength}! ${excludedCount}× ${lowerDeckPoundage}# guns cannot fire`, 'info');
          lowerDeckRestriction = true;
          availableGuns = filteredGuns;
        }
        
        if (availableGuns.length === 0) {
          addLog(`⚠️ ${firingShip.name}: ALL guns unavailable in heavy weather (lower deck only)`, 'error');
          return;
        }
      }
    }

    // Calculate available gun crew (BTQ M.3 - Gun Crews must be fully manned)
    let availableGunCrew;
    if (firingShip.crewAssignmentMode && firingShip.crewAssignments) {
      availableGunCrew = firingShip.crewAssignments.gunCrews;
    } else {
      // If crew mode disabled, assume all crew available for guns
      availableGunCrew = firingShip.crew - firingShip.crewLoss;
    }

    if (rakeType !== 'None' && shotType !== 'Ball') {
      addLog('⚠️ Raking requires Ball shot', 'error');
      return;
    }

    if (rakeType !== 'None' && distance > 19) {
      addLog('⚠️ Raking requires ≤19cm', 'error');
      return;
    }

    const ibAvailable = useInitialBroadside && 
                        firingShip.crewQuality === 'Experienced' && 
                        firingShip.initialBroadside[arc];

    const ngm = NATIONALITY_MODIFIERS[firingShip.nationality] || 1.0;
    
    // Shot modifier - use house rule values if enabled
    let shotMod;
    if (useModifiedShot) {
      // House rule: modified shot type multipliers
      const MODIFIED_SHOT_MODIFIERS = { Ball: 1.0, Double: 1.25, Dismantling: 1.5, Grape: 1.2, Canister: 1.6 };
      shotMod = MODIFIED_SHOT_MODIFIERS[shotType] || 1.0;
    } else {
      // Standard BTQ rules
      shotMod = SHOT_MODIFIERS[shotType] || 1.0;
    }
    
    const rakeMod = rakeType === 'Bow' ? 1.1 : rakeType === 'Stern' ? 1.25 : 1.0;
    
    // Calculate required crew for THIS specific arc being fired
    let requiredForThisArc = 0;
    availableGuns.forEach(gun => {
      const crewPerGun = GUN_CREW_SIZES[gun.type] || 6;
      requiredForThisArc += crewPerGun * gun.count;
    });

    // Check if ship has enough crew to fire this arc
    // With 50%+ of total required (both broadsides), you can fire ONE full broadside
    const canFireFullBroadside = availableGunCrew >= requiredForThisArc;
    
    let totalHits = 0;
    let totalDamage = 0;
    let totalGunsFiring = 0;
    let totalGunsAvailable = 0;

    // Calculate how many guns can actually fire
    availableGuns.forEach(gun => {
      totalGunsAvailable += gun.count;
      
      let gunsFiring;
      if (canFireFullBroadside) {
        // Enough crew - fire ALL guns in this arc
        gunsFiring = gun.count;
      } else {
        // Insufficient crew - fire proportionally
        const crewPerGun = GUN_CREW_SIZES[gun.type] || 6;
        const maxGunsWeCanMan = Math.floor(availableGunCrew / crewPerGun);
        gunsFiring = Math.min(maxGunsWeCanMan, gun.count);
        availableGunCrew -= gunsFiring * crewPerGun; // Deduct crew for next gun type
      }
      
      if (gunsFiring === 0) return; // Not enough crew for even one gun
      
      totalGunsFiring += gunsFiring;
      
      const rangeBand = getRangeBand(gun.type, distance);
      if (rangeBand === 'Out of Range') return;
      if (!canFireShot(shotType, rangeBand, aimType)) return;

      let roll = (Math.floor(Math.random() * 100) + 1) / 100;

      if (ibAvailable) roll = Math.min(1.0, roll + 0.50);
      if (rangeBand === 'Close') roll = Math.min(1.0, roll + 0.13);

      const rangeModifier = rangeBand === 'PB' ? 1.0 : RANGE_MODIFIERS[rangeBand];
      const hits = rangeBand === 'PB' ? gunsFiring : roll * rangeModifier * gunsFiring;
      const damage = hits * gun.poundage * ngm * shotMod * rakeMod;
      
      totalHits += hits;
      totalDamage += damage;
    });

    // Warn if insufficient crew prevented full broadside
    if (!canFireFullBroadside && totalGunsFiring < totalGunsAvailable) {
      const unmannedGuns = totalGunsAvailable - totalGunsFiring;
      addLog(`⚠️ Insufficient Gun Crews! Only ${totalGunsFiring} of ${totalGunsAvailable} guns manned, ${unmannedGuns} guns unmanned (need full crew for gun)`, 'warning');
    }

    if (totalHits === 0) {
      // If we reach here, it's either insufficient crew or all guns out of range
      if (totalGunsFiring === 0) {
        addLog('⚠️ No guns could fire (insufficient crew to man any guns)', 'error');
      } else {
        addLog('⚠️ No hits scored (likely all guns out of range)', 'error');
      }
      return;
    }

    totalDamage = Math.round(totalDamage);
    
    // Apply half damage if toggle is enabled
    if (gunneryForm.halfDamage) {
      totalDamage = Math.floor(totalDamage / 2);
    }

    // Check for hull shots at range that might hit sails instead (BTQ gunnery calculator)
    let actualAimType = aimType;
    if (aimType === 'Hull') {
      const rangeBand = getRangeBand(availableGuns[0].type, distance);
      let sailHitChance = 0;
      
      if (rangeBand === 'Medium') sailHitChance = 0.15; // 15% chance
      else if (rangeBand === 'Long') sailHitChance = 0.30; // 30% chance
      else if (rangeBand === 'Extreme') sailHitChance = 0.50; // 50% chance
      
      if (sailHitChance > 0 && Math.random() < sailHitChance) {
        actualAimType = 'Rigging';
        addLog(`🎯 Hull shot hit rigging instead! (${Math.round(sailHitChance * 100)}% chance at range)`, 'info');
      }
    }

    let crewLost = 0;
    if (actualAimType === 'Crew') {
      const crewDamageDivisor = useReducedCrewDamage ? 6 : 1; // House rule: 1/6 damage if enabled, otherwise full (1/1)
      crewLost = Math.floor(totalDamage / crewDamageDivisor);
    }

    if (ibAvailable) {
      setShips(prevShips => prevShips.map(s => {
        if (s.id === firingShip.id) {
          return {
            ...s,
            initialBroadside: { ...s.initialBroadside, [arc]: false }
          };
        }
        return s;
      }));
    }

    const unmannedGuns = totalGunsAvailable - totalGunsFiring;

    const result = {
      totalHits: totalHits.toFixed(1),
      totalDamage,
      crewLost,
      aimType: actualAimType,
      shotType,
      rakeType,
      firingShip: firingShip.name,
      targetShip: targetShip.name,
      targetShipId: targetShip.id,
      arc,
      targetLocation,
      distance,
      ibUsed: ibAvailable,
      gunsFiring: totalGunsFiring,
      gunsAvailable: totalGunsAvailable,
      unmannedGuns: unmannedGuns > 0 ? unmannedGuns : null
    };

    setLastGunneryResult(result);
    
    // Enhanced detailed logging with per-gun-type range bands
    addLog(`🔥 ${firingShip.name} fires ${arc} at ${targetShip.name} (${distance}cm)`, 'success');
    
    // Show each gun type with its specific range band
    availableGuns.forEach(gun => {
      const gunRangeBand = getRangeBand(gun.type, distance);
      const gunRangeMod = gunRangeBand === 'PB' ? 1.0 : RANGE_MODIFIERS[gunRangeBand];
      
      if (gunRangeBand === 'Out of Range') {
        addLog(`   ❌ ${gun.count}× ${gun.type}: OUT OF RANGE (max ${getMaxRange(gun.type)}cm)`, 'warning');
      } else {
        addLog(`   📊 ${gun.count}× ${gun.type}: ${gunRangeBand} (${gunRangeMod.toFixed(2)}× modifier)`, 'info');
      }
    });
    
    if (unmannedGuns > 0) {
      addLog(`   ⚠️ Crew shortage: ${totalGunsFiring} of ${totalGunsAvailable} guns manned (${unmannedGuns} unmanned)`, 'warning');
    } else {
      addLog(`   ✅ All ${totalGunsFiring} guns fully manned`, 'info');
    }
    
    const nationalityMod = NATIONALITY_MODIFIERS[firingShip.nationality] || 1.0;
    addLog(`   🎯 Other modifiers: ${nationalityMod.toFixed(2)}× (nationality) × ${shotMod}× (${shotType})${rakeType !== 'None' ? ` × ${rakeMod}× (${rakeType} rake)` : ''}`, 'info');
    addLog(`   💥 Results: ${totalHits.toFixed(1)} hits → ${totalDamage} damage to ${actualAimType}`, 'success');
  };

  // === DAMAGE APPLICATION ===
  
  const adjustCrewAssignmentsForCasualties = (ship) => {
    if (!ship.crewAssignmentMode || !ship.crewAssignments) return ship;
    
    const available = ship.crew - ship.crewLoss;
    const currentTotal = Object.values(ship.crewAssignments).reduce((sum, v) => sum + v, 0);
    
    // If over-assigned due to casualties, proportionally reduce all assignments
    if (currentTotal > available) {
      const ratio = available / currentTotal;
      const adjusted = {
        gunCrews: Math.floor(ship.crewAssignments.gunCrews * ratio),
        sailingCrew: Math.floor(ship.crewAssignments.sailingCrew * ratio),
        fireFighting: Math.floor(ship.crewAssignments.fireFighting * ratio)
      };
      
      return { ...ship, crewAssignments: adjusted };
    }
    
    return ship;
  };

  const applySailDamage = (ship, damage) => {
    let updatedShip = { ...ship };
    let damageLog = [];
    
    // Ensure required arrays exist
    if (!Array.isArray(updatedShip.sailsLost)) {
      updatedShip.sailsLost = [];
    }
    if (!Array.isArray(updatedShip.mastSectionsLost)) {
      updatedShip.mastSectionsLost = [];
    }
    if (!Array.isArray(updatedShip.sailLayout)) {
      console.error('Ship missing sailLayout:', ship);
      return { ship: updatedShip, log: ['⚠️ Error: Ship missing sail layout'] };
    }
    
    updatedShip.sailDamage += damage;
    
    while (updatedShip.sailDamage >= updatedShip.svn) {
      updatedShip.sailDamage -= updatedShip.svn;
      
      const remainingSails = updatedShip.sailLayout.filter(s => 
        !updatedShip.sailsLost.some(lost => lost.name === s.name)
      );
      
      if (remainingSails.length === 0) {
        damageLog.push('⛵ All sails destroyed!');
        break;
      }
      
      const randomSail = remainingSails[Math.floor(Math.random() * remainingSails.length)];
      updatedShip.sailsLost.push(randomSail);
      damageLog.push(`⛵ Lost: ${randomSail.name}`);
      
      // 35% chance of mast section destruction
      if (Math.random() <= 0.35) {
        // Track mast section loss
        const mastSectionKey = `${randomSail.mast}-${randomSail.section}`;
        if (!updatedShip.mastSectionsLost.includes(mastSectionKey)) {
          updatedShip.mastSectionsLost.push(mastSectionKey);
          damageLog.push(`💥 Mast section destroyed: ${randomSail.mast} (section ${randomSail.section})`);
          
          // HOUSE RULE: Crew casualties from falling mast
          let minCasualties = 0;
          let maxCasualties = 5;
          
          // Determine casualties by ship class
          const shipClass = updatedShip.class.toLowerCase();
          if (shipClass.includes('1st') || shipClass.includes('2nd') || shipClass.includes('3rd')) {
            // Large ships (1st-3rd rate): 0-15 crew
            maxCasualties = 15;
          } else if (shipClass.includes('4th') || shipClass.includes('5th') || shipClass.includes('6th') || 
                     shipClass.includes('large merchantman') || shipClass.includes('indiaman')) {
            // Medium ships (4th-6th rate, large merchantmen): 0-10 crew
            maxCasualties = 10;
          } else {
            // Small ships (below 6th rate): 0-5 crew
            maxCasualties = 5;
          }
          
          const casualties = Math.floor(Math.random() * (maxCasualties + 1));
          if (casualties > 0) {
            updatedShip.crewLoss += casualties;
            damageLog.push(`💀 ${casualties} crew killed by falling mast!`);
            
            // Auto-adjust crew assignments if casualties occurred
            updatedShip = adjustCrewAssignmentsForCasualties(updatedShip);
          }
          
          // Cascade: destroy all sails on higher sections of same mast
          const cascadeSails = updatedShip.sailLayout.filter(s => 
            s.mast === randomSail.mast && 
            s.section > randomSail.section &&
            !updatedShip.sailsLost.some(lost => lost.name === s.name)
          );
          
          cascadeSails.forEach(sail => {
            updatedShip.sailsLost.push(sail);
            damageLog.push(`  ↳ Cascade: ${sail.name}`);
            
            // Also track the cascaded mast sections as destroyed
            const cascadedMastSectionKey = `${sail.mast}-${sail.section}`;
            if (!updatedShip.mastSectionsLost.includes(cascadedMastSectionKey)) {
              updatedShip.mastSectionsLost.push(cascadedMastSectionKey);
            }
          });
          
          // Calculate SP loss from mast sections (BTQ 6.98: every 10% = 1 SP)
          const totalSections = updatedShip.sailLayout.length;
          const mastSectionLossPct = Math.floor((updatedShip.mastSectionsLost.length / totalSections) * 100);
          const spFromMastSections = Math.floor(mastSectionLossPct / 10);
          
          // Track how many SP we've already deducted for mast sections
          if (!updatedShip.mastSectionsSpDeducted) {
            updatedShip.mastSectionsSpDeducted = 0;
          }
          
          const newSpLoss = spFromMastSections - updatedShip.mastSectionsSpDeducted;
          if (newSpLoss > 0) {
            updatedShip.sp = Math.max(0, updatedShip.sp - newSpLoss);
            updatedShip.mastSectionsSpDeducted = spFromMastSections;
            damageLog.push(`📊 -${newSpLoss} SP (${updatedShip.mastSectionsLost.length}/${totalSections} mast sections = ${mastSectionLossPct}%)`);
          }
        }
      }
    }
    
    return { ship: updatedShip, log: damageLog };
  };

  const applyHullDamage = (ship, damage, targetLocation) => {
    let updatedShip = { ...ship };
    let damageLog = [];
    
    // Ensure fires array exists
    if (!Array.isArray(updatedShip.fires)) {
      updatedShip.fires = [];
    }
    
    updatedShip.hullDamage += damage;
    updatedShip.gdnCarry += damage;
    
    const hullPct = Math.floor((updatedShip.hullDamage / updatedShip.hvn) * 100);
    const oldHullPct = Math.floor(((updatedShip.hullDamage - damage) / updatedShip.hvn) * 100);
    
    const spLoss = Math.floor(hullPct / 5) - Math.floor(oldHullPct / 5);
    if (spLoss > 0) {
      updatedShip.sp = Math.max(0, updatedShip.sp - spLoss);
      damageLog.push(`📊 -${spLoss} SP (${hullPct}% hull)`);
      
      // Special damage roll (House Rule: Fire on 1, then BTQ 6.5 shifted)
      for (let i = 0; i < spLoss; i++) {
        const roll = Math.floor(Math.random() * 100) + 1;
        if (roll === 1) {
          // House rule: fire starts on roll 1
          updatedShip.fires.push({ 
            id: Date.now() + Math.random(), 
            age: 0, 
            intensity: 'Minor'
          });
          updatedShip.sp = Math.max(0, updatedShip.sp - 1);
          damageLog.push(`🔥 FIRE STARTED! (-1 SP)`);
        } else if (roll >= 2 && roll <= 3) {
          // House rule: Rudder on 2-3 (shifted from BTQ 1-2)
          if (!updatedShip.rudder) {
            updatedShip.rudder = true;
            updatedShip.sp = Math.max(0, updatedShip.sp - 2);
            damageLog.push(`🎯 RUDDER DESTROYED! (-2 SP, turning -50%)`);
          }
        } else if (roll >= 4 && roll <= 5) {
          // House rule: Wheel on 4-5 (shifted from BTQ 3-4)
          if (!updatedShip.wheel) {
            updatedShip.wheel = true;
            updatedShip.sp = Math.max(0, updatedShip.sp - 1);
            damageLog.push(`🎯 WHEEL DESTROYED! (-1 SP, turning -25%)`);
          }
        }
        // Roll 6-100 = No special damage
      }
    }
    
    while (updatedShip.gdnCarry >= updatedShip.gdn) {
      updatedShip.gdnCarry -= updatedShip.gdn;
      
      // Determine which arc to hit based on target location
      let arcToHit;
      if (targetLocation === 'Port' || targetLocation === 'Starboard') {
        arcToHit = targetLocation;
      } else {
        // Bow or Stern hits: randomly allocate to Port or Starboard
        arcToHit = Math.random() < 0.5 ? 'Port' : 'Starboard';
      }
      
      const availableGuns = updatedShip.arcs[arcToHit].filter(g => g.count > 0);
      if (availableGuns.length === 0) continue;
      
      const randomGunGroup = availableGuns[Math.floor(Math.random() * availableGuns.length)];
      const gunIndex = updatedShip.arcs[arcToHit].findIndex(g => g === randomGunGroup);
      
      updatedShip.arcs[arcToHit][gunIndex] = {
        ...randomGunGroup,
        count: randomGunGroup.count - 1
      };
      
      // Fix NaN bug: ensure crew size exists, default to 4 if not found
      const crewSize = GUN_CREW_SIZES[randomGunGroup.type] || 4;
      const crewLoss = Math.floor(Math.random() * crewSize);
      updatedShip.crewLoss += crewLoss;
      
      damageLog.push(`💥 Gun lost: ${randomGunGroup.type} (${arcToHit}) → ${crewLoss} crew`);
    }
    
    // Auto-adjust crew assignments if casualties occurred
    updatedShip = adjustCrewAssignmentsForCasualties(updatedShip);
    
    return { ship: updatedShip, log: damageLog };
  };

  const applyCrewDamage = (ship, casualties) => {
    let updatedShip = { ...ship };
    updatedShip.crewLoss += casualties;
    
    // Auto-adjust crew assignments if over-allocated due to casualties
    updatedShip = adjustCrewAssignmentsForCasualties(updatedShip);
    
    return {
      ship: updatedShip,
      log: [`💀 ${casualties} casualties`]
    };
  };

  const applyDamage = () => {
    if (!lastGunneryResult) {
      console.error('No gunnery result to apply');
      return;
    }
    
    const targetShipId = lastGunneryResult.targetShipId;
    const damage = lastGunneryResult.totalDamage;
    const aimType = lastGunneryResult.aimType;
    const targetLocation = lastGunneryResult.targetLocation;
    
    if (!targetShipId || damage === undefined || !aimType) {
      console.error('Invalid gunnery result:', lastGunneryResult);
      addLog('⚠️ Error: Invalid damage data', 'error');
      return;
    }
    
    setShips(prevShips => prevShips.map(s => {
      if (s.id !== targetShipId) return s;
      
      let result;
      let allLogs = [];
      
      try {
        if (aimType === 'Rigging') {
          result = applySailDamage(s, damage);
          allLogs = result.log;
        } else if (aimType === 'Hull') {
          result = applyHullDamage(s, damage, targetLocation);
          allLogs = result.log;
        } else if (aimType === 'Crew') {
          const crewDamageDivisor = useReducedCrewDamage ? 6 : 1; // House rule: 1/6 damage if enabled, otherwise full (1/1)
          const casualties = Math.floor(damage / crewDamageDivisor);
          result = applyCrewDamage(s, casualties);
          allLogs = result.log;
        } else {
          // Fallback for unknown aim type
          console.error('Unknown aim type:', aimType);
          result = { ship: s, log: [`⚠️ Unknown aim type: ${aimType}`] };
          allLogs = result.log;
        }
        
        if (!result || !result.ship) {
          console.error('Damage function returned invalid result:', result);
          return s; // Return unchanged ship if something went wrong
        }
        
        allLogs.forEach(msg => addLog(`${s.name}: ${msg}`, 'error'));
        
        // Log target status after damage
        const hullPct = Math.round((result.ship.hullDamage / result.ship.hvn) * 100);
        const crewRemaining = result.ship.crew - result.ship.crewLoss;
        const crewPct = Math.round((crewRemaining / result.ship.crew) * 100);
        
        if (aimType === 'Hull') {
          addLog(`   🎯 ${s.name} status: ${result.ship.hullDamage}/${result.ship.hvn} hull (${hullPct}%), SP ${result.ship.sp}, ${crewRemaining} crew (${crewPct}%)`, 'info');
        } else if (aimType === 'Rigging') {
          const sailsLost = result.ship.sailsLost?.length || 0;
          const totalSails = result.ship.sailLayout?.length || 1;
          addLog(`   🎯 ${s.name} status: ${sailsLost}/${totalSails} sails lost, SP ${result.ship.sp}, ${crewRemaining} crew (${crewPct}%)`, 'info');
        } else if (aimType === 'Crew') {
          addLog(`   🎯 ${s.name} status: ${crewRemaining}/${result.ship.crew} crew (${crewPct}%), SP ${result.ship.sp}`, 'info');
        }
        
        // Check for surrender (BTQ 6.94)
        if (result.ship.sp === 0 && s.sp > 0) {
          addLog(`⚑ ${s.name} STRIKES COLORS! (0 SP)`, 'error');
        }
        
        return result.ship;
      } catch (error) {
        console.error('Error applying damage:', error);
        addLog(`⚠️ Error applying damage to ${s.name}: ${error.message}`, 'error');
        return s; // Return unchanged ship if error occurs
      }
    }));
    
    setLastGunneryResult(null); // Clear the result after applying
    addLog('✅ Damage applied', 'success');
  };

  // ============================================================================
  // V8 HELPER FUNCTIONS - ENHANCED FIRE SYSTEM
  // ============================================================================

  const getFireIntensity = (age) => {
    if (age <= 2) return 'Minor';
    if (age <= 5) return 'Major';
    return 'Conflagration';
  };

  const getFireFightingBonus = (ship) => {
    let bonus = 0;
    if (ship.organizedFireParty) bonus += 10;
    if (ship.firePumps) bonus += 5;
    return bonus;
  };

  const calculateFireSpeedPenalty = (ship) => {
    if (!useEnhancedFire) return 0;
    
    const hasConflag = ship.fires.some(f => f.intensity === 'Conflagration');
    if (hasConflag) return 0.50;
    
    const hasMajor = ship.fires.some(f => f.intensity === 'Major');
    if (hasMajor) return 0.25;
    
    return 0;
  };

  const checkMagazineExplosion = (fire, ship) => {
    if (ship.magazineFlooded) return false;
    if (!useEnhancedFire) return false;
    
    const ageKey = Math.min(fire.age, 9);
    const risk = MAGAZINE_EXPLOSION_RISK.hasOwnProperty(ageKey) 
      ? MAGAZINE_EXPLOSION_RISK[ageKey] 
      : 25; // Fallback only for undefined ages (10+)
    const roll = Math.random() * 100;
    
    // Enhanced detailed logging
    addLog(`   🎲 ${ship.name} Fire (Age ${fire.age}, ${getFireIntensity(fire.age)}): Magazine explosion roll ${roll.toFixed(1)}% ≤ ${risk}%?`, 'info');
    
    if (roll <= risk) {
      addLog(`💥 ${ship.name}: MAGAZINE EXPLOSION! Ship destroyed!`, 'error');
      return true;
    } else {
      addLog(`   ✅ Safe (rolled ${roll.toFixed(1)}% > ${risk}%)`, 'info');
    }
    return false;
  };

  const shouldFireSpread = (fire, ship) => {
    if (!useEnhancedFire) return false;
    
    const baseChance = FIRE_SPREAD_CHANCES[wind.strength] || 35;
    let spreadChance = baseChance;
    
    if (ship.organizedFireParty) spreadChance -= 10;
    
    const roll = Math.random() * 100;
    return roll <= spreadChance;
  };

  const floodMagazine = (shipId) => {
    console.log('floodMagazine called with shipId:', shipId);
    setShips(prev => {
      const updated = prev.map(s => {
        if (s.id === shipId) {
          console.log('Flooding magazine for ship:', s.name);
          addLog(`💧 ${s.name}: Magazine flooded - all guns disabled but explosion prevented`, 'info');
          return { ...s, magazineFlooded: true };
        }
        return s;
      });
      console.log('Ships updated after flood');
      return updated;
    });
  };

  const toggleOrganizedFireParty = (shipId) => {
    setShips(prev => prev.map(s => {
      if (s.id === shipId) {
        const newState = !s.organizedFireParty;
        addLog(`${s.name}: Organized fire party ${newState ? 'activated' : 'deactivated'}`, 'info');
        return { ...s, organizedFireParty: newState };
      }
      return s;
    }));
  };

  // Manual damage control functions
  const manualRemoveSail = (shipId) => {
    setShips(prev => prev.map(s => {
      if (s.id === shipId) {
        // Find next remaining sail
        const remainingSails = s.sailLayout.filter(sail => 
          !s.sailsLost.some(lost => lost.name === sail.name)
        );
        
        if (remainingSails.length === 0) {
          addLog(`${s.name}: All sails already lost!`, 'error');
          return s;
        }
        
        // Remove the first remaining sail (no mast destruction roll)
        const sailToRemove = remainingSails[0];
        const newSailsLost = [...s.sailsLost, sailToRemove];
        
        addLog(`✂️ ${s.name}: Manually removed ${sailToRemove.name} (no mast roll)`, 'info');
        
        return {
          ...s,
          sailsLost: newSailsLost,
          sailDamage: s.sailDamage + s.svn // Increment sail damage appropriately
        };
      }
      return s;
    }));
  };

  const manualStartFire = (shipId) => {
    setShips(prev => prev.map(s => {
      if (s.id === shipId) {
        const newFire = {
          id: Date.now() + Math.random(),
          age: 0,
          intensity: 'Minor'
        };
        
        const newFires = [...s.fires, newFire];
        addLog(`🔥 ${s.name}: Fire started manually (${newFires.length} total)`, 'info');
        
        return {
          ...s,
          fires: newFires,
          sp: Math.max(0, s.sp - 1) // -1 SP for fire (BTQ house rule)
        };
      }
      return s;
    }));
  };

  // ============================================================================
  // V8 HELPER FUNCTIONS - BOARDING SYSTEM
  // ============================================================================

  const attemptGrapple = (attackerShipId, defenderShipId) => {
    const attacker = ships.find(s => s.id === attackerShipId);
    const defender = ships.find(s => s.id === defenderShipId);
    
    if (!attacker || !defender) return;
    
    const sameDirection = attacker.pos === defender.pos;
    const roll = Math.random() * 100;
    
    if (sameDirection || roll <= 50) {
      setShips(prev => prev.map(s => {
        if (s.id === attackerShipId || s.id === defenderShipId) {
          return {
            ...s,
            grappled: s.id === attackerShipId ? defenderShipId : attackerShipId,
            grappledTurns: 0,
            sp: Math.max(0, s.sp - 2), // BTQ 6.98: -2 SP for being grappled
            boardingState: {
              portBulwark: null,
              starboardBulwark: null,
              firstHalfDeck: null,
              secondHalfDeck: null,
              activeAttacker: null
            }
          };
        }
        return s;
      }));
      addLog(`⚓ ${attacker.name} grapples ${defender.name}! (Both ships -2 SP)`, 'success');
    } else {
      addLog(`⚓ ${attacker.name} fails to grapple ${defender.name}`, 'error');
    }
  };

  const attemptCutGrapples = (shipId) => {
    const ship = ships.find(s => s.id === shipId);
    if (!ship || !ship.grappled) return;
    
    const roll = Math.random() * 100;
    if (roll <= 30) {
      const grappledShip = ships.find(s => s.id === ship.grappled);
      setShips(prev => prev.map(s => {
        if (s.id === shipId || s.id === ship.grappled) {
          return {
            ...s,
            grappled: null,
            grappledTurns: 0,
            boardingState: null
          };
        }
        return s;
      }));
      addLog(`✂️ ${ship.name} cuts grapples with ${grappledShip?.name}`, 'success');
    } else {
      addLog(`✂️ ${ship.name} fails to cut grapples`, 'error');
    }
  };

  const performBoardingAction = (attackerShipId, defenderShipId, area) => {
    const attacker = ships.find(s => s.id === attackerShipId);
    const defender = ships.find(s => s.id === defenderShipId);
    
    if (!attacker || !defender) return;
    if (attacker.grappledTurns < 1) {
      addLog('⚠️ Must wait 1 turn after grappling before boarding!', 'error');
      return;
    }
    
    // Check if we need both bulwarks first
    if ((area === 'firstHalfDeck' || area === 'secondHalfDeck')) {
      const bothBulwarks = 
        attacker.boardingState.portBulwark === 'attacker' && 
        attacker.boardingState.starboardBulwark === 'attacker';
      
      if (!bothBulwarks) {
        addLog('⚠️ Must control both bulwarks first!', 'error');
        return;
      }
    }
    
    if (area === 'secondHalfDeck' && attacker.boardingState.firstHalfDeck !== 'attacker') {
      addLog('⚠️ Must control first half deck before second!', 'error');
      return;
    }
    
    // CORRECT BTQ BOARDING RULES (8.32-8.33)
    const attackerCrew = attacker.crew - attacker.crewLoss;
    const defenderCrew = defender.crew - defender.crewLoss;
    
    // Each side rolls d100 separately (8.32)
    const attackerRoll = Math.floor(Math.random() * 100) + 1;
    const defenderRoll = Math.floor(Math.random() * 100) + 1;
    
    // Apply soldier modifiers (N.B.C.F. Modifiers)
    let attackerMod = 0;
    let defenderMod = 0;
    if (attacker.soldierPercent >= 20) attackerMod = 10;
    else if (attacker.soldierPercent >= 10) attackerMod = 5;
    if (defender.soldierPercent >= 20) defenderMod = 10;
    else if (defender.soldierPercent >= 10) defenderMod = 5;
    
    const attackerAdjustedRoll = Math.max(1, Math.min(100, attackerRoll + attackerMod));
    const defenderAdjustedRoll = Math.max(1, Math.min(100, defenderRoll + defenderMod));
    
    // Look up Nationality Boarding Casualty Factor (NBCF) from tables
    const attackerTable = BOARDING_CASUALTY_TABLES[attacker.nationality] || BOARDING_CASUALTY_TABLES._default;
    const defenderTable = BOARDING_CASUALTY_TABLES[defender.nationality] || BOARDING_CASUALTY_TABLES._default;
    
    const attackerNBCF = attackerTable.find(r => attackerAdjustedRoll >= r.min && attackerAdjustedRoll <= r.max)?.casualties || 15;
    const defenderNBCF = defenderTable.find(r => defenderAdjustedRoll >= r.min && defenderAdjustedRoll <= r.max)?.casualties || 15;
    
    // Calculate casualties inflicted on enemy (8.33: "Divide boarding party by NBCF = casualties enemy suffers")
    const defenderLosses = Math.round(attackerCrew / attackerNBCF); // Attacker inflicts on defender
    const attackerLosses = Math.round(defenderCrew / defenderNBCF); // Defender inflicts on attacker
    
    // Detailed combat log showing all rolls and calculations
    addLog(`⚔️ BOARDING COMBAT for ${area}:`, 'info');
    addLog(`  ${attacker.name}: Roll ${attackerRoll}${attackerMod > 0 ? ` +${attackerMod}` : ''} = ${attackerAdjustedRoll} → NBCF: ${attackerNBCF}`, 'info');
    addLog(`  ${attackerCrew} crew ÷ ${attackerNBCF} = ${defenderLosses} casualties inflicted on ${defender.name}`, 'info');
    addLog(`  ${defender.name}: Roll ${defenderRoll}${defenderMod > 0 ? ` +${defenderMod}` : ''} = ${defenderAdjustedRoll} → NBCF: ${defenderNBCF}`, 'info');
    addLog(`  ${defenderCrew} crew ÷ ${defenderNBCF} = ${attackerLosses} casualties inflicted on ${attacker.name}`, 'info');
    
    // Apply casualties (8.34: Side with most casualties retreats one area)
    setShips(prev => prev.map(s => {
      if (s.id === attackerShipId) {
        let newState = { ...s, crewLoss: s.crewLoss + attackerLosses };
        
        // Auto-adjust crew assignments for casualties
        newState = adjustCrewAssignmentsForCasualties(newState);
        
        // Winner is side that inflicted MORE casualties (suffered LESS)
        if (attackerLosses < defenderLosses) {
          newState.boardingState = { ...s.boardingState, [area]: 'attacker' };
          if (!s.boardingState.activeAttacker) {
            newState.boardingState.activeAttacker = attackerShipId;
          }
          
          // Check for capture (both half decks controlled)
          if (newState.boardingState.firstHalfDeck === 'attacker' && 
              newState.boardingState.secondHalfDeck === 'attacker') {
            addLog(`🏴 ${s.name} CAPTURES ${defender.name}!`, 'success');
          }
        } else if (defenderLosses < attackerLosses) {
          newState.boardingState = { ...s.boardingState, [area]: 'defender' };
        }
        // If equal casualties, no change (contested)
        
        return newState;
      }
      
      if (s.id === defenderShipId) {
        let newState = { ...s, crewLoss: s.crewLoss + defenderLosses };
        
        // Auto-adjust crew assignments for casualties
        newState = adjustCrewAssignmentsForCasualties(newState);
        
        // Check if captured
        const attackerBoardingState = ships.find(sh => sh.id === attackerShipId)?.boardingState;
        if (attackerLosses < defenderLosses) {
          const futureState = { ...attackerBoardingState, [area]: 'attacker' };
          if (futureState.firstHalfDeck === 'attacker' && futureState.secondHalfDeck === 'attacker') {
            newState.status = 'Captured';
            newState.sp = 0;
          }
        }
        
        return newState;
      }
      
      return s;
    }));
    
    // Result summary
    if (attackerLosses < defenderLosses) {
      addLog(`✅ ${attacker.name} WINS ${area}! (Casualties: A: ${attackerLosses}, D: ${defenderLosses})`, 'success');
    } else if (defenderLosses < attackerLosses) {
      addLog(`🛡️ ${defender.name} HOLDS ${area}! (Casualties: A: ${attackerLosses}, D: ${defenderLosses})`, 'error');
    } else {
      addLog(`⚔️ DRAW at ${area}! (Equal casualties: ${attackerLosses})`, 'info');
    }
  };

  // ============================================================================
  // V8 HELPER FUNCTIONS - CREW MANAGEMENT SYSTEM
  // ============================================================================

  const calculateRequiredGunCrew = (ship) => {
    let totalRequired = 0;
    
    // BOTH BROADSIDES (Port + Starboard) - Total guns on ship
    // Historical: Ships had crew for both broadsides, just couldn't sustain both simultaneously
    // This way: 50% crew can fire ONE full broadside
    ship.arcs.Port.forEach(gun => {
      const crewPerGun = GUN_CREW_SIZES[gun.type] || 6;
      totalRequired += crewPerGun * gun.count;
    });
    
    ship.arcs.Starboard.forEach(gun => {
      const crewPerGun = GUN_CREW_SIZES[gun.type] || 6;
      totalRequired += crewPerGun * gun.count;
    });
    
    // PLUS bow chasers
    ship.arcs.Bow.forEach(gun => {
      const crewPerGun = GUN_CREW_SIZES[gun.type] || 6;
      totalRequired += crewPerGun * gun.count;
    });
    
    // PLUS stern chasers
    ship.arcs.Stern.forEach(gun => {
      const crewPerGun = GUN_CREW_SIZES[gun.type] || 6;
      totalRequired += crewPerGun * gun.count;
    });
    
    return totalRequired;
  };

  const calculateRequiredSailingCrew = (ship) => {
    return Math.ceil(ship.hvn / 30);
  };

  const getGunCrewPenalty = (ship) => {
    if (!ship.crewAssignmentMode) return 0;
    
    const required = calculateRequiredGunCrew(ship);
    const assigned = ship.crewAssignments?.gunCrews || 0;
    
    if (assigned < required) {
      const percentShort = ((required - assigned) / required) * 100;
      if (percentShort >= 50) return -999; // Can't fire
      return -percentShort;
    }
    return 0;
  };

  const getSailingCrewPenalty = (ship) => {
    if (!ship.crewAssignmentMode) return 0;
    
    const required = calculateRequiredSailingCrew(ship);
    const assigned = ship.crewAssignments?.sailingCrew || 0;
    
    if (assigned < required) {
      const percentShort = ((required - assigned) / required) * 100;
      return percentShort; // Return positive percentage
    }
    return 0;
  };

  const toggleCrewAssignmentMode = (shipId, enabled) => {
    setShips(prev => prev.map(s => {
      if (s.id === shipId) {
        if (enabled) {
          return {
            ...s,
            crewAssignmentMode: true,
            crewAssignments: {
              gunCrews: 0,
              sailingCrew: 0,
              fireFighting: 0
            }
          };
        } else {
          return {
            ...s,
            crewAssignmentMode: false,
            crewAssignments: null
          };
        }
      }
      return s;
    }));
  };

  const updateCrewAssignment = (shipId, type, value) => {
    setShips(prev => prev.map(s => {
      if (s.id === shipId && s.crewAssignmentMode) {
        const newAssignments = { ...s.crewAssignments, [type]: value };
        const total = Object.values(newAssignments).reduce((sum, v) => sum + v, 0);
        const available = s.crew - s.crewLoss;
        
        // Allow reductions even if currently over-assigned (fixing casualties)
        const oldTotal = Object.values(s.crewAssignments).reduce((sum, v) => sum + v, 0);
        const isReduction = total <= oldTotal;
        
        if (total > available && !isReduction) {
          addLog(`⚠️ Not enough crew! Available: ${available}`, 'error');
          return s;
        }
        
        return { ...s, crewAssignments: newAssignments };
      }
      return s;
    }));
  };

  // Auto-adjust crew assignments when casualties occur
  const advanceTurn = () => {
    // Save current state before advancing
    setPreviousTurnState({
      ships: JSON.parse(JSON.stringify(ships)),
      turn,
      wind: { ...wind },
      log: [...log]
    });
    
    const updatedShips = ships.map(ship => {
      let updatedShip = { ...ship };
      
      // Increment grappled turns for ALL ships (v8)
      if (updatedShip.grappled) {
        updatedShip.grappledTurns += 1;
      }
      
      // If no fires, return the updated ship (with grappled turns incremented)
      if (ship.fires.length === 0) return updatedShip;
      
      // Track new fires created by spreading
      const newSpreadFires = [];
      
      // Track if magazine explosion occurred
      let magazineExploded = false;
      
      const updatedFires = ship.fires.map(fire => {
        // If magazine already exploded, no need to process remaining fires
        if (magazineExploded) return null;
        
        const newAge = fire.age + 1;
        const newIntensity = getFireIntensity(newAge);
        
        // Check for magazine explosion (v8)
        if (useEnhancedFire && checkMagazineExplosion({ ...fire, age: newAge }, ship)) {
          magazineExploded = true;
          return null; // Fire removed if ship explodes
        }
        
        // Check for fire spreading (v8) - BTQ L.4.1.1: roll for each fire EVERY turn
        let newFire = { ...fire, age: newAge, intensity: newIntensity };
        if (useEnhancedFire) {
          const baseChance = FIRE_SPREAD_CHANCES[wind.strength] || 35;
          let spreadChance = baseChance;
          if (ship.organizedFireParty) spreadChance -= 10;
          const roll = Math.random() * 100;
          
          addLog(`   🔥 ${ship.name} Fire (Age ${newAge}, ${newIntensity}): Spread roll ${roll.toFixed(1)}% ≤ ${spreadChance}%?`, 'info');
          
          if (roll <= spreadChance) {
            addLog(`   ⚠️ SPREADS! Creates new fire (Age 0, Minor)`, 'error');
            
            // Queue new fire to be added after map completes
            newSpreadFires.push({ 
              id: Date.now() + Math.random(),
              age: 0, 
              intensity: 'Minor'
            });
          } else {
            addLog(`   ✅ Contained (rolled ${roll.toFixed(1)}% > ${spreadChance}%)`, 'info');
          }
        }
        
        // HOUSE RULE: Fire crew casualties based on intensity
        if (useEnhancedFire) {
          let casualtyChance = 0;
          let minCasualties = 0;
          let maxCasualties = 0;
          
          if (newIntensity === 'Minor') {
            casualtyChance = 10; // 10% chance
            minCasualties = 1;
            maxCasualties = 3;
          } else if (newIntensity === 'Major') {
            casualtyChance = 25; // 25% chance
            minCasualties = 2;
            maxCasualties = 5;
          } else if (newIntensity === 'Conflagration') {
            casualtyChance = 50; // 50% chance
            minCasualties = 3;
            maxCasualties = 8;
          }
          
          const casualtyRoll = Math.random() * 100;
          if (casualtyRoll <= casualtyChance) {
            const casualties = Math.floor(Math.random() * (maxCasualties - minCasualties + 1)) + minCasualties;
            updatedShip.crewLoss += casualties;
            addLog(`🔥💀 ${ship.name}: Fire kills ${casualties} crew! (${newIntensity})`, 'error');
            
            // Auto-adjust crew assignments if casualties occurred
            updatedShip = adjustCrewAssignmentsForCasualties(updatedShip);
          }
        }
        
        // Standard extinguish check
        const roll = Math.random() * 100;
        let extinguishChance;
        
        const fireBonus = getFireFightingBonus(ship);
        
        if (newAge === 1) {
          extinguishChance = (ship.crewQuality === 'Experienced' ? 62 : 52) + fireBonus;
        } else if (newAge === 2) {
          extinguishChance = (ship.crewQuality === 'Experienced' ? 44 : 34) + fireBonus;
        } else {
          extinguishChance = (ship.crewQuality === 'Experienced' ? 29 : 19) + fireBonus;
        }
        
        if (roll <= extinguishChance) {
          addLog(`🔥 ${ship.name}: Fire out!`, 'success');
          return null;
        }
        
        return newFire;
      }).filter(f => f !== null);
      
      // Add new fires from spreading (BTQ L.4.1.2: "creates a new, separate fire")
      const allFires = [...updatedFires, ...newSpreadFires];
      
      let fireHullDamage = 0;
      allFires.forEach(fire => {
        if (fire.age >= 4) {
          const fivePctHull = Math.round(ship.hvn * 0.05);
          fireHullDamage += fivePctHull;
        }
      });
      
      if (fireHullDamage > 0) {
        const burningFires = allFires.filter(f => f.age >= 4);
        const fireAges = burningFires.map(f => `Age ${f.age}`).join(', ');
        addLog(`🔥 ${ship.name}: ${burningFires.length} fires burn hull for ${fireHullDamage} damage (${fireAges})`, 'error');
        
        // Apply fire damage to gdnCarry (same as hull damage)
        updatedShip.gdnCarry += fireHullDamage;
        
        // Calculate SP loss from fire damage (every 5% hull = 1 SP)
        const newHullPct = Math.floor(((ship.hullDamage + fireHullDamage) / ship.hvn) * 100);
        const oldHullPct = Math.floor((ship.hullDamage / ship.hvn) * 100);
        const spLoss = Math.floor(newHullPct / 5) - Math.floor(oldHullPct / 5);
        
        if (spLoss > 0) {
          updatedShip.sp = Math.max(0, updatedShip.sp - spLoss);
          addLog(`   📊 ${ship.name}: -${spLoss} SP from fire damage (${oldHullPct}% → ${newHullPct}% hull)`, 'error');
        }
      }
      
      return {
        ...updatedShip,
        fires: magazineExploded ? [] : allFires, // Clear all fires if exploded
        hullDamage: ship.hullDamage + fireHullDamage,
        status: magazineExploded ? 'Exploded' : updatedShip.status || 'Active',
        sp: magazineExploded ? 0 : updatedShip.sp
      };
    });
    
    setShips(updatedShips);
    setTurn(prev => prev + 1);
    
    // Wind changes every 10 turns (BTQ 3.12 & 3.22)
    if (turn % 10 === 0) {
      // Wind STRENGTH change (BTQ 3.12)
      const strengthRoll = Math.floor(Math.random() * 100) + 1;
      const currentStrengthIdx = WIND_STRENGTHS.indexOf(wind.strength);
      
      if (strengthRoll <= 25 && currentStrengthIdx > 0) {
        // Drop one level
        const newStrength = WIND_STRENGTHS[currentStrengthIdx - 1];
        setWind(prev => ({ ...prev, strength: newStrength }));
        addLog(`💨 Wind drops to ${newStrength}`, 'info');
      } else if (strengthRoll >= 76 && currentStrengthIdx < WIND_STRENGTHS.length - 1) {
        // Increase one level
        const newStrength = WIND_STRENGTHS[currentStrengthIdx + 1];
        setWind(prev => ({ ...prev, strength: newStrength }));
        addLog(`💨 Wind increases to ${newStrength}`, 'info');
      }
      
      // Wind DIRECTION change (BTQ 3.22)
      const directionRoll = Math.floor(Math.random() * 100) + 1;
      const dirIdx = COMPASS_POINTS.indexOf(wind.direction);
      
      if (directionRoll <= 5) {
        // 8 points right
        const newIdx = (dirIdx + 8) % 32;
        setWind(prev => ({ ...prev, direction: COMPASS_POINTS[newIdx] }));
        addLog(`💨 Wind shifts 8 pts RIGHT to ${COMPASS_POINTS[newIdx]}`, 'info');
      } else if (directionRoll <= 10) {
        // 8 points left
        const newIdx = (dirIdx - 8 + 32) % 32;
        setWind(prev => ({ ...prev, direction: COMPASS_POINTS[newIdx] }));
        addLog(`💨 Wind shifts 8 pts LEFT to ${COMPASS_POINTS[newIdx]}`, 'info');
      } else if (directionRoll <= 30) {
        // 4 points right
        const newIdx = (dirIdx + 4) % 32;
        setWind(prev => ({ ...prev, direction: COMPASS_POINTS[newIdx] }));
        addLog(`💨 Wind shifts 4 pts RIGHT to ${COMPASS_POINTS[newIdx]}`, 'info');
      } else if (directionRoll <= 50) {
        // 4 points left
        const newIdx = (dirIdx - 4 + 32) % 32;
        setWind(prev => ({ ...prev, direction: COMPASS_POINTS[newIdx] }));
        addLog(`💨 Wind shifts 4 pts LEFT to ${COMPASS_POINTS[newIdx]}`, 'info');
      }
      // else 51-100: no change
    }
    
    // Turn Summary
    addLog(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 'info');
    addLog(`📊 Turn ${turn} Summary:`, 'success');
    updatedShips.forEach(ship => {
      const hullPct = Math.round((ship.hullDamage / ship.hvn) * 100);
      const crewRemaining = ship.crew - ship.crewLoss;
      const crewPct = Math.round((crewRemaining / ship.crew) * 100);
      const fireCount = ship.fires?.length || 0;
      const fireAges = fireCount > 0 ? ` (ages: ${ship.fires.map(f => f.age).join(',')})` : '';
      const sailsLost = ship.sailsLost?.length || 0;
      const totalSails = ship.sailLayout?.length || 1;
      
      let statusEmoji = '⚓';
      if (ship.status === 'Exploded') statusEmoji = '💥';
      else if (ship.sp === 0) statusEmoji = '⚑';
      else if (hullPct >= 75) statusEmoji = '🔥';
      else if (hullPct >= 50) statusEmoji = '⚠️';
      
      addLog(`   ${statusEmoji} ${ship.name}: Hull ${ship.hullDamage}/${ship.hvn} (${hullPct}%), SP ${ship.sp}, Crew ${crewRemaining}/${ship.crew} (${crewPct}%), Sails ${sailsLost}/${totalSails}, Fires ${fireCount}${fireAges}`, 'info');
    });
    addLog(`   💨 Wind: ${wind.strength} from ${wind.direction}`, 'info');
    addLog(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 'info');
    
    addLog(`Turn ${turn + 1} begins`, 'info');
  };

  const startNewGame = () => {
    if (ships.length > 0) {
      setShowResetConfirm(true);
      return;
    }
    performReset();
  };

  const performReset = () => {
    setShips([]);
    setTurn(1);
    setWind({ strength: 'Gentle breeze', direction: 'N' });
    setLog([]);
    setLastGunneryResult(null);
    setPreviousTurnState(null);
    setShowResetConfirm(false);
    addLog('🎮 New game started', 'success');
  };

  const restartTurn = () => {
    if (!previousTurnState) {
      addLog('⚠️ No previous turn to restart', 'error');
      return;
    }
    setShowRestartConfirm(true);
  };

  const performRestart = () => {
    setShips(previousTurnState.ships);
    setTurn(previousTurnState.turn);
    setWind(previousTurnState.wind);
    setLog(previousTurnState.log);
    setPreviousTurnState(null);
    setShowRestartConfirm(false);
    addLog('↩️ Turn restarted', 'info');
  };

  const exportGame = () => {
    const gameState = {
      version: 'BTQ-v7',
      timestamp: new Date().toISOString(),
      ships,
      turn,
      wind,
      log,
      usePercentTurnPenalty
    };
    
    const dataStr = JSON.stringify(gameState, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const filename = `btq-save-turn${turn}-${Date.now()}.json`;
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL after a delay
    setTimeout(() => URL.revokeObjectURL(url), 100);
    
    addLog(`💾 Game exported: ${filename}`, 'success');
  };

  const importGame = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const gameState = JSON.parse(e.target.result);
        
        if (!gameState.version || !gameState.ships) {
          throw new Error('Invalid save file');
        }
        
        setShips(gameState.ships || []);
        setTurn(gameState.turn || 1);
        setWind(gameState.wind || { strength: 'Gentle breeze', direction: 'N' });
        setLog(gameState.log || []);
        setUsePercentTurnPenalty(gameState.usePercentTurnPenalty || false);
        setPreviousTurnState(null);
        setLastGunneryResult(null);
        
        // Reset gunnery form to ensure targetLocation exists
        setGunneryForm({
          firingShipId: '',
          targetShipId: '',
          arc: 'Port',
          targetLocation: 'Port',
          distance: 10,
          shotType: 'Ball',
          aimType: 'Hull',
          rakeType: 'None',
          useInitialBroadside: true
        });
        
        addLog('📂 Game loaded', 'success');
      } catch (error) {
        addLog(`⚠️ Import failed: ${error.message}`, 'error');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const addGunGroup = () => {
    setShipForm(prev => ({
      ...prev,
      guns: [...prev.guns, { type: '18# Long', poundage: 18, count: 10 }]
    }));
  };

  const removeGunGroup = (index) => {
    setShipForm(prev => ({
      ...prev,
      guns: prev.guns.filter((_, i) => i !== index)
    }));
  };

  const updateGunGroup = (index, field, value) => {
    setShipForm(prev => ({
      ...prev,
      guns: prev.guns.map((g, i) => {
        if (i !== index) return g;
        const updated = { ...g, [field]: value };
        if (field === 'type') {
          updated.poundage = parseGunPoundage(value);
        }
        return updated;
      })
    }));
  };

  const getTurnCap = (shipClass) => {
    if (shipClass.includes('1st') || shipClass.includes('2nd')) return 3;
    if (shipClass.includes('3rd')) return 5;
    if (shipClass.includes('4th')) return 6;  // Fixed: BTQ 4.21 - 4th rates (50-58 guns) = 6 points
    if (shipClass.includes('Large Frigates')) return 7;  // Fixed: BTQ 4.21 - Large frigates (42-48 guns) = 7 points
    if (shipClass.includes('5th') || shipClass.includes('6th')) return 8;
    if (shipClass.includes('Sloops') || shipClass.includes('Xebecs')) return 9;
    if (shipClass.includes('Brigs') || shipClass.includes('Snows')) return 9;
    return 10;
  };

  const testMovement = (ship) => {
    const table = MOVEMENT_TABLES[ship.class];
    if (!table) return null;
    
    const speeds = table[wind.strength];
    if (!speeds) return null;

    let base = speeds[ship.pos];
    let driftSpeed = speeds['D']; // Drift speed from table
    let isDriftOnly = false;
    
    // Apply GRADUAL sailing crew penalty in 10% increments
    const sailingPenaltyPercent = getSailingCrewPenalty(ship);
    
    if (sailingPenaltyPercent > 0) {
      if (sailingPenaltyPercent >= 90 || ship.crewAssignments?.sailingCrew === 0) {
        // 90%+ short OR zero crew = DRIFT ONLY MODE (locked at drift speed)
        base = driftSpeed;
        isDriftOnly = true;
      } else {
        // Gradual penalty in 10% increments
        // 0-10% short = -10% speed
        // 10-20% short = -20% speed
        // 20-30% short = -30% speed, etc.
        const penaltyIncrement = Math.ceil(sailingPenaltyPercent / 10) * 10;
        const speedMultiplier = 1 - (penaltyIncrement / 100);
        const penalizedSpeed = Math.floor(base * speedMultiplier);
        
        // 🔧 FIX: Drift speed is the MINIMUM for any manned sailing
        // If penalties would drop speed below drift, use drift as the floor
        base = Math.max(penalizedSpeed, driftSpeed);
      }
    }
    
    const sailLossPct = (ship.sailsLost.length / ship.sails) * 100;
    const sailPenalty = Math.round(base * sailLossPct / 100);
    
    const turnPenalty = usePercentTurnPenalty 
      ? Math.round(base * 0.05 * ship.turnPoints)
      : 15 * ship.turnPoints;
    
    const maxSpeed = Math.max(0, base - sailPenalty - turnPenalty);
    const minSpeed = ship.lastMove > 0 ? Math.floor(ship.lastMove * 0.5) : 0;
    const maxCap = ship.lastMove > 0 ? ship.lastMove * 2 : maxSpeed;
    
    const allowedMin = Math.max(minSpeed, 0);
    const allowedMax = Math.min(maxSpeed, maxCap);
    
    return {
      base,
      maxSpeed,
      allowedRange: `${allowedMin} - ${allowedMax}mm`,
      sailingCrewPenalty: sailingPenaltyPercent > 0,
      sailingCrewPenaltyPercent: Math.ceil(sailingPenaltyPercent / 10) * 10, // Rounded to 10%
      isDriftOnly,
      driftSpeed
    };
  };

  const createShip = () => {
    if (!shipForm.name) {
      addLog('⚠️ Name required', 'error');
      return;
    }

    const derived = calculateDerivedStats(shipForm);
    const mastStructure = getMastStructure(shipForm.class);
    const sailLayout = MAST_STRUCTURES[mastStructure].layouts[shipForm.sails] || 
                       MAST_STRUCTURES[mastStructure].layouts[Object.keys(MAST_STRUCTURES[mastStructure].layouts)[0]];
    
    const arcs = { Port: [], Starboard: [], Bow: [], Stern: [] };

    shipForm.guns.forEach(gun => {
      const halfCount = Math.floor(gun.count / 2);
      const remainder = gun.count % 2;
      
      arcs.Port.push({
        type: gun.type,
        poundage: gun.poundage,
        count: halfCount + remainder
      });
      
      arcs.Starboard.push({
        type: gun.type,
        poundage: gun.poundage,
        count: halfCount
      });
    });

    if (shipForm.bowChasers.count > 0) {
      arcs.Bow.push({
        type: shipForm.bowChasers.type,
        poundage: shipForm.bowChasers.poundage,
        count: shipForm.bowChasers.count
      });
    }

    if (shipForm.sternChasers.count > 0) {
      arcs.Stern.push({
        type: shipForm.sternChasers.type,
        poundage: shipForm.sternChasers.poundage,
        count: shipForm.sternChasers.count
      });
    }

    const newShip = {
      id: `ship_${Date.now()}`,
      name: shipForm.name,
      class: shipForm.class,
      tonnage: shipForm.tonnage,
      sails: shipForm.sails,
      crew: shipForm.crew,
      crewQuality: shipForm.crewQuality,
      nationality: shipForm.nationality,
      ...derived,
      arcs,
      mastStructure,
      sailLayout,
      hullDamage: 0,
      sailDamage: 0,
      crewLoss: 0,
      sp: 10,
      fires: [],
      wheel: false,
      rudder: false,
      gdnCarry: 0,
      sailsLost: [],
      mastSectionsLost: [],
      mastSectionsSpDeducted: 0, // Track SP already deducted from mast sections
      lastMove: 0,
      turnPoints: 0,
      pos: 'Ru',
      initialBroadside: { Port: true, Starboard: true, Bow: true, Stern: true },
      // V8 fields
      magazineFlooded: false,
      organizedFireParty: false,
      firePumps: shipForm.class.includes('1st') || shipForm.class.includes('2nd') || shipForm.class.includes('3rd'),
      grappled: null,
      grappledTurns: 0,
      boardingState: null,
      hasSoldiers: false,
      soldierPercent: 0,
      crewAssignmentMode: false,
      crewAssignments: null,
      pvnPenaltyApplied: false,
      status: 'Active'
    };

    setShips(prev => {
      const updatedShips = [...prev, newShip];
      // Apply PVN penalties if option is enabled
      if (usePvnSurrender && updatedShips.length >= 2) {
        // Reset penalty flags for recalculation
        return calculatePvnPenalties(updatedShips.map(s => ({ ...s, pvnPenaltyApplied: false })));
      }
      return updatedShips;
    });
    addLog(`✅ ${newShip.name} added`, 'success');
    setShipAddedMessage(`✓ ${newShip.name} added!`);
    setTimeout(() => setShipAddedMessage(''), 3000);
    setShipForm({ ...DEFAULT_SHIP_FORM });
  };

  return (
    <div className="min-h-screen p-2 sm:p-4" style={{
      background: 'linear-gradient(to bottom, #2c1810 0%, #1a0f08 100%)',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        
        * {
          font-family: 'Crimson Text', serif;
        }
        
        h1, h2, h3, .heading-font {
          font-family: 'Cinzel', serif;
        }
        
        .parchment-texture {
          background-image: 
            linear-gradient(to bottom, rgba(242,235,211,0.95), rgba(230,220,190,0.95)),
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><filter id="noise"><feTurbulence baseFrequency="0.9" numOctaves="4" seed="0"/></filter><rect width="200" height="200" filter="url(%23noise)" opacity="0.15"/></svg>');
          background-blend-mode: overlay;
        }
        
        .wood-border {
          background: linear-gradient(135deg, #3d2817 0%, #2a1810 50%, #3d2817 100%);
          color: #8a7a68;
          box-shadow: 
            inset 0 2px 4px rgba(0,0,0,0.5),
            inset 0 -2px 4px rgba(255,255,255,0.1),
            0 4px 12px rgba(0,0,0,0.6);
        }
        
        /* Override cream text for form elements - they use their own colors */
        .wood-border .parchment-input,
        .wood-border .parchment-input option {
          color: #5a4635 !important;
        }
        
        .navy-button {
          background: linear-gradient(135deg, #1a4d6d 0%, #2c5f7f 100%);
          border: 2px solid #8b6f47;
          color: #f0e7d5;
          font-family: 'Cinzel', serif;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.8);
          box-shadow: 0 3px 8px rgba(0,0,0,0.4);
          transition: all 0.2s ease;
        }
        
        .navy-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #2c5f7f 0%, #3d7a9f 100%);
          transform: translateY(-1px);
          box-shadow: 0 5px 12px rgba(0,0,0,0.5);
        }
        
        .navy-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(0,0,0,0.4);
        }
        
        .parchment-input {
          background: rgba(250, 245, 230, 0.8);
          border: 2px solid #8b6f47;
          color: #5a4635 !important;
          font-family: 'Crimson Text', serif;
        }
        
        .parchment-input::placeholder {
          color: #5a4635;
          opacity: 0.7;
        }
        
        .parchment-input option {
          color: #5a4635;
          background: #faf5e6;
        }
        
        .parchment-input:focus {
          outline: none;
          border-color: #d4af37;
          background: rgba(255, 250, 235, 0.95);
          color: #5a4635 !important;
        }
        
        /* Ensure all form inputs default to dark text */
        .wood-border input:not([class*="text-"]),
        .wood-border select:not([class*="text-"]),
        .wood-border textarea:not([class*="text-"]) {
          color: #1a1410;
        }
        
        .ship-card {
          background: linear-gradient(to bottom right, rgba(242,235,211,0.98), rgba(230,220,190,0.98));
          border: 3px solid #8b6f47;
          border-radius: 6px;
          box-shadow: 
            0 4px 12px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.4);
        }
        
        .stat-label {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: #e8dfc8;
        }
        
        .stat-value {
          font-family: 'Crimson Text', serif;
          font-size: 16px;
          font-weight: 600;
          color: #1a1410;
        }
        
        .gold-accent {
          color: #d4af37;
          text-shadow: 0 1px 2px rgba(0,0,0,0.8);
        }
        
        .ink-text {
          color: #3d2817;
        }
        
        .wood-border .stat-label {
          color: #e8dfc8;
        }
        
        /* Aged parchment text colors for dark backgrounds */
        .parchment-text {
          color: #e8dfc8;
        }
        
        .faded-text {
          color: #c9b896;
        }
        
        .decorative-line {
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #8b6f47 20%, #d4af37 50%, #8b6f47 80%, transparent 100%);
        }
        
        .tab-button {
          font-family: 'Cinzel', serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          padding: 8px 16px;
          border: 2px solid #8b6f47;
          background: rgba(58, 47, 31, 0.6);
          color: #c9b896;
          transition: all 0.2s ease;
        }
        
        .tab-button:hover {
          background: rgba(76, 60, 42, 0.8);
          color: #f0e7d5;
        }
        
        .tab-button.active {
          background: linear-gradient(135deg, #1a4d6d 0%, #2c5f7f 100%);
          color: #f0e7d5;
          border-color: #d4af37;
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="wood-border p-4 sm:p-6 mb-4 rounded-lg">
          <div className="text-center mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 gold-accent heading-font" style={{ letterSpacing: '2px' }}>
              BEAT TO QUARTERS
            </h1>
            <div className="decorative-line my-2"></div>
            <p className="text-sm sm:text-base" style={{ color: '#c9b896', fontStyle: 'italic' }}>
              A Naval Wargame Companion for the Age of Sail
            </p>
          </div>
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Ship className="w-5 h-5" style={{ color: '#d4af37' }} />
              <div className="parchment-texture px-3 py-1 rounded text-xs ink-text font-semibold">Turn {turn}</div>
              {ships.length > 0 && (
                <div className="parchment-texture px-3 py-1 rounded text-xs ink-text font-semibold">{ships.length} Ships</div>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Wind className="w-4 h-4" style={{ color: '#d4af37' }} />
              <select
                value={wind.strength}
                onChange={(e) => setWind(prev => ({ ...prev, strength: e.target.value }))}
                className="parchment-input rounded px-2 py-1 text-xs text-[#5a4635]"
                style={{ color: '#5a4635' }}
              >
                {WIND_STRENGTHS.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
              <select
                value={wind.direction}
                onChange={(e) => setWind(prev => ({ ...prev, direction: e.target.value }))}
                className="parchment-input rounded px-2 py-1 text-xs text-[#5a4635]"
                style={{ color: '#5a4635' }}
              >
                {COMPASS_POINTS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <button onClick={advanceTurn} className="navy-button px-3 py-1 rounded text-xs min-h-[44px]">
                ⚓ Next Turn
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 justify-end flex-wrap mt-3">
            <button 
              onClick={startNewGame}
              className="navy-button px-3 py-1 rounded text-xs min-h-[44px]"
            >
              🎮 New Game
            </button>
            <button 
              onClick={restartTurn}
              disabled={!previousTurnState}
              className={`navy-button px-3 py-1 rounded text-xs min-h-[44px] ${
                !previousTurnState && 'opacity-50 cursor-not-allowed'
              }`}
            >
              ↩️ Restart
            </button>
            <button 
              onClick={exportGame}
              disabled={ships.length === 0}
              className={`navy-button px-3 py-1 rounded text-xs min-h-[44px] ${
                ships.length === 0 && 'opacity-50 cursor-not-allowed'
              }`}
            >
              💾 Export
            </button>
            <label className="navy-button px-3 py-1 rounded text-xs cursor-pointer min-h-[44px] flex items-center gap-1">
              📂 Import
              <input
                type="file"
                accept=".json"
                onChange={importGame}
                className="hidden"
              />
            </label>
          </div>
          
          <div className="parchment-texture rounded px-3 py-2 mt-3 flex items-center gap-2 sm:gap-4 text-xs flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useEnhancedFire}
                onChange={(e) => setUseEnhancedFire(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="font-medium ink-text">🔥 Enhanced Fire (v8 - L.4)</span>
            </label>
            <span className="text-xs" style={{ color: '#5a4635' }}>Fire spreading, intensity levels, magazine explosions</span>
          </div>
          
          <div className="parchment-texture rounded px-3 py-2 mt-2 flex items-center gap-2 sm:gap-4 text-xs flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useReducedCrewDamage}
                onChange={(e) => setUseReducedCrewDamage(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="font-medium ink-text">💀 Reduced Crew Damage (House Rule)</span>
            </label>
            <span className="text-xs" style={{ color: '#5a4635' }}>1/6 damage vs crew (OFF = full 1/1 damage)</span>
          </div>
          
          <div className="parchment-texture rounded px-3 py-2 mt-2 flex items-center gap-2 sm:gap-4 text-xs flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useModifiedShot}
                onChange={(e) => setUseModifiedShot(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="font-medium ink-text">🎯 Shot Type Modification (House Rule)</span>
            </label>
            <span className="text-xs" style={{ color: '#5a4635' }}>Dismantling 1.5×, Grape 1.2×, Canister 1.6× (OFF = BTQ standard)</span>
          </div>
        </div>

        <div className="parchment-texture rounded-lg p-3 sm:p-4">
          <div className="flex gap-1 mb-4 overflow-x-auto border-b-2 border-[#8b6f47] pb-2">
            {['ships', 'movement', 'gunnery', 'boarding', 'damage', 'crew', 'log'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-button rounded-t ${activeTab === tab ? 'active' : ''}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

        {activeTab === 'ships' && (
          <div className="space-y-3">
            <div className="wood-border p-4 sm:p-6 rounded-lg">
              <h2 className="text-lg sm:text-xl font-bold mb-3 gold-accent heading-font">Create New Ship</h2>
              <div className="decorative-line mb-4"></div>
              
              <div className="space-y-3">
                <div>
                  <label className="stat-label block mb-1 parchment-text">Ship Name</label>
                  <input
                    value={shipForm.name}
                    onChange={(e) => setShipForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full parchment-input rounded px-3 py-2 text-sm text-[#5a4635]"
                    style={{ color: '#5a4635' }}
                    placeholder="HMS Victory"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="stat-label block mb-1 parchment-text">Ship Class</label>
                    <select
                      value={shipForm.class}
                      onChange={(e) => setShipForm(prev => ({ ...prev, class: e.target.value }))}
                      className="w-full parchment-input rounded px-3 py-2 text-sm text-[#5a4635]"
                      style={{ color: '#5a4635' }}
                    >
                      {Object.keys(MOVEMENT_TABLES).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="stat-label block mb-1 parchment-text">Tonnage</label>
                    <input
                      type="number"
                      value={shipForm.tonnage}
                      onChange={(e) => setShipForm(prev => ({ ...prev, tonnage: parseInt(e.target.value) }))}
                      className="w-full bg-[#3a2f1f] border-2 border-[#2a1f0f] shadow-inner rounded px-2 py-1 text-xs text-[#e8dfc8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2">
                  <div>
                    <label className="stat-label block mb-1 parchment-text">Sails</label>
                    <select
                      value={shipForm.sails}
                      onChange={(e) => setShipForm(prev => ({ ...prev, sails: parseInt(e.target.value) }))}
                      className="w-full bg-[#3a2f1f] border-2 border-[#2a1f0f] shadow-inner rounded px-2 py-1 text-xs text-[#e8dfc8]"
                    >
                      {[10,9,8,7,6,5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="stat-label block mb-1 parchment-text">Crew</label>
                    <input
                      type="number"
                      value={shipForm.crew}
                      onChange={(e) => setShipForm(prev => ({ ...prev, crew: parseInt(e.target.value) }))}
                      className="w-full bg-[#3a2f1f] border-2 border-[#2a1f0f] shadow-inner rounded px-2 py-1 text-xs text-[#e8dfc8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2">
                  <div>
                    <label className="stat-label block mb-1 parchment-text">Quality</label>
                    <select
                      value={shipForm.crewQuality}
                      onChange={(e) => setShipForm(prev => ({ ...prev, crewQuality: e.target.value }))}
                      className="w-full bg-[#3a2f1f] border-2 border-[#2a1f0f] shadow-inner rounded px-2 py-1 text-xs text-[#e8dfc8]"
                    >
                      <option>Experienced</option>
                      <option>Inexperienced</option>
                    </select>
                  </div>
                  <div>
                    <label className="stat-label block mb-1 parchment-text">Nationality</label>
                    <select
                      value={shipForm.nationality}
                      onChange={(e) => setShipForm(prev => ({ ...prev, nationality: e.target.value }))}
                      className="w-full bg-[#3a2f1f] border-2 border-[#2a1f0f] shadow-inner rounded px-2 py-1 text-xs text-[#e8dfc8]"
                    >
                      {Object.entries(NATIONALITY_MODIFIERS).map(([nat, mod]) => (
                        <option key={nat} value={nat}>{nat.slice(0, 30)} ({mod})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs" style={{ color: "#c9b896" }}>Broadside Guns</label>
                    <button onClick={addGunGroup} className="px-2 py-0.5 bg-[#2a4a6f] rounded text-xs flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Add
                    </button>
                  </div>
                  {shipForm.guns.map((gun, idx) => (
                    <div key={idx} className="flex gap-1 mb-1">
                      <select
                        value={gun.type}
                        onChange={(e) => updateGunGroup(idx, 'type', e.target.value)}
                        className="flex-1 bg-[#3a2f1f] border-2 border-[#2a1f0f] shadow-inner rounded px-1 py-1 text-xs text-[#e8dfc8]"
                      >
                        {GUN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <input
                        type="number"
                        value={gun.count}
                        onChange={(e) => updateGunGroup(idx, 'count', parseInt(e.target.value))}
                        className="w-12 bg-[#3a2f1f] border-2 border-[#2a1f0f] shadow-inner rounded px-1 py-1 text-xs text-[#e8dfc8]"
                      />
                      <button onClick={() => removeGunGroup(idx)} className="px-1 bg-[#a52a2a] rounded">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2">
                  <div>
                    <label className="stat-label block mb-1 parchment-text">Bow Chasers</label>
                    <div className="flex gap-1">
                      <select
                        value={shipForm.bowChasers.type}
                        onChange={(e) => setShipForm(prev => ({ 
                          ...prev, 
                          bowChasers: { ...prev.bowChasers, type: e.target.value, poundage: parseGunPoundage(e.target.value) }
                        }))}
                        className="flex-1 bg-[#3a2f1f] border-2 border-[#2a1f0f] shadow-inner rounded px-1 py-1 text-xs text-[#e8dfc8]"
                      >
                        {GUN_TYPES.slice(0, 15).map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <input
                        type="number"
                        value={shipForm.bowChasers.count}
                        onChange={(e) => setShipForm(prev => ({ 
                          ...prev, 
                          bowChasers: { ...prev.bowChasers, count: parseInt(e.target.value) }
                        }))}
                        className="w-10 bg-[#3a2f1f] border-2 border-[#2a1f0f] shadow-inner rounded px-1 py-1 text-xs text-[#e8dfc8]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="stat-label block mb-1 parchment-text">Stern Chasers</label>
                    <div className="flex gap-1">
                      <select
                        value={shipForm.sternChasers.type}
                        onChange={(e) => setShipForm(prev => ({ 
                          ...prev, 
                          sternChasers: { ...prev.sternChasers, type: e.target.value, poundage: parseGunPoundage(e.target.value) }
                        }))}
                        className="flex-1 bg-[#3a2f1f] border-2 border-[#2a1f0f] shadow-inner rounded px-1 py-1 text-xs text-[#e8dfc8]"
                      >
                        {GUN_TYPES.slice(0, 15).map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <input
                        type="number"
                        value={shipForm.sternChasers.count}
                        onChange={(e) => setShipForm(prev => ({ 
                          ...prev, 
                          sternChasers: { ...prev.sternChasers, count: parseInt(e.target.value) }
                        }))}
                        className="w-10 bg-[#3a2f1f] border-2 border-[#2a1f0f] shadow-inner rounded px-1 py-1 text-xs text-[#e8dfc8]"
                      />
                    </div>
                  </div>
                </div>

                {shipForm.guns.length > 0 && (
                  <div className="p-2 bg-[#d4c4a8]/50 rounded border border-[#1a1410] text-[#2a1810]">
                    <div className="text-xs mb-1 font-semibold">📊 Stats Preview:</div>
                    {(() => {
                      const stats = calculateDerivedStats(shipForm);
                      return (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-1 text-xs">
                          <div><span className="font-semibold">HVN:</span> <span className="text-green-600">{stats.hvn}</span></div>
                          <div><span className="font-semibold">SVN:</span> <span className="text-green-600">{stats.svn}</span></div>
                          <div><span className="font-semibold">GDN:</span> <span className="text-green-600">{stats.gdn}</span></div>
                          <div><span className="font-semibold">LGBWN:</span> <span className="font-bold">{stats.lgbwn}</span></div>
                          <div><span className="font-semibold">CBWN:</span> <span className="font-bold">{stats.cbwn}</span></div>
                          <div><span className="font-semibold">PVN:</span> <span className="font-bold">{stats.pvn}</span></div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              <button onClick={createShip} className="mt-2 w-full px-3 py-1 bg-[#2a4a6f] hover:bg-[#1a3a5f] rounded font-bold text-xs min-h-[44px]">
                ⚓ Create Ship
              </button>
              {shipAddedMessage && (
                <div className="mt-1 text-center text-green-400 font-bold text-xs">{shipAddedMessage}</div>
              )}
            </div>

            <div className="space-y-2">
              {ships.map(ship => (
                <div key={ship.id} className="bg-[#e8dfc8] text-[#5a4635] rounded border-4 border-[#8b6f47] shadow-2xl p-3 relative" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(212,175,55,0.3)' }}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm sm:text-base" style={{ color: '#d4af37' }}>{ship.name}</h3>
                    <div className="flex gap-2 items-center">
                      {ship.status === 'Exploded' && (
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-900 text-yellow-400 animate-pulse">
                          💥 EXPLODED!
                        </span>
                      )}
                      {ship.sp === 0 && ship.status !== 'Exploded' && (
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-white text-black animate-pulse">
                          ⚑ STRUCK!
                        </span>
                      )}
                      {isTwoDeckerShip(ship.class) && isHeavyWeather(wind.strength) && getLowerDeckGuns(ship).length > 0 && (
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-600 text-white" title="Lower gunports closed in heavy weather">
                          🌊 LOWER CLOSED
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        ship.sp >= 7 ? 'bg-green-700' : ship.sp >= 4 ? 'bg-yellow-700' : 'bg-red-700'
                      }`}>
                        SP {ship.sp}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2 text-xs mb-2">
                    <div>
                      <span style={{ color: "#5a4635" }} className="font-semibold">Hull:</span> <span className="font-bold">{Math.floor((ship.hullDamage / ship.hvn) * 100)}%</span>
                    </div>
                    <div>
                      <span style={{ color: "#5a4635" }} className="font-semibold">Sails:</span> <span className="font-bold">{ship.sailsLost.length}/{ship.sails}</span>
                    </div>
                    <div>
                      <span style={{ color: "#5a4635" }} className="font-semibold">Crew:</span> <span className="font-bold">{ship.crew - ship.crewLoss}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-1 text-xs">
                    {['Port', 'Starboard', 'Bow', 'Stern'].map(arc => {
                      const guns = ship.arcs[arc];
                      if (!guns || guns.length === 0) return null;
                      const total = guns.reduce((sum, g) => sum + g.count, 0);
                      return (
                        <div key={arc} className="p-1 bg-[#d4c4a8]/50 rounded">
                          <div style={{ color: "#2a1810" }} className="font-bold">{arc}:</div>
                          {guns.map((g, i) => g.count > 0 && (
                            <div key={i} style={{ color: "#1a1410" }}>{g.count}× {g.type}</div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                  {ship.fires.length > 0 && (
                    <div className="mt-1 text-xs text-orange-400">
                      🔥 {ship.fires.length} fire{ship.fires.length > 1 ? 's' : ''}
                    </div>
                  )}
                  
                  {/* Grappling Controls */}
                  <div className="mt-2 pt-2 border-t border-[#1a1410]">
                    {ship.grappled ? (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-green-400">
                          ⚓ Grappled to: {ships.find(s => s.id === ship.grappled)?.name}
                        </span>
                        <button
                          onClick={() => attemptCutGrapples(ship.id)}
                          style={{ background: "linear-gradient(135deg, #8b1a1a 0%, #a52a2a 100%)" }}
                          className="px-2 py-1 rounded text-xs font-bold"
                        >
                          ✂️ Cut Grapples
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <select
                          id={`grapple-target-${ship.id}`}
                          className="flex-1 bg-[#3a2f1f] border-2 border-[#2a1f0f] shadow-inner rounded px-2 py-1 text-xs text-[#e8dfc8]"
                          defaultValue=""
                        >
                          <option value="" disabled>Select ship to grapple...</option>
                          {ships.filter(s => s.id !== ship.id && !s.grappled && s.sp > 0).map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => {
                            const select = document.getElementById(`grapple-target-${ship.id}`);
                            const targetId = select.value;
                            if (targetId) {
                              attemptGrapple(ship.id, targetId);
                              select.value = '';
                            }
                          }}
                          className="px-3 py-1 bg-[#2a4a6f] hover:bg-[#1a3a5f] rounded text-xs font-bold whitespace-nowrap"
                        >
                          ⚓ Grapple
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'movement' && (
          <div className="wood-border p-4 sm:p-6 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs sm:text-sm font-bold gold-accent heading-font">Movement Calculator</h2>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={usePercentTurnPenalty}
                  onChange={(e) => setUsePercentTurnPenalty(e.target.checked)}
                  className="w-4 h-4"
                />
                <label className="text-xs parchment-text">5% per turn (optional)</label>
              </div>
            </div>
            
            {ships.length === 0 ? (
              <div style={{ color: "#c9b896" }} className="text-center py-8 text-xs sm:text-sm">
                No ships. Go to Ships tab.
              </div>
            ) : (
              ships.map(ship => {
                const movement = testMovement(ship);
                if (!movement) return null;

                const turnCap = getTurnCap(ship.class);

                return (
                  <div key={ship.id} className="bg-[#3a2f1f] text-[#d9d0b8] rounded p-2 sm:p-3 mb-3 border-2 border-[#2a1f0f] shadow-inner">
                    <h3 className="font-bold mb-2 text-xs sm:text-sm">{ship.name}</h3>
                    
                    {/* BTQ 4.26 & 6.52: Tacking Restrictions */}
                    {(ship.mastSectionsLost.length > 0 || 
                      ship.rudder || 
                      ship.wheel || 
                      ['Calm', 'Slight breeze', 'Light breeze'].includes(wind.strength)) && (
                      <div className="mb-2 p-2 bg-red-900/30 border border-red-700 rounded text-xs">
                        <div className="font-bold text-red-300 mb-1">🚫 TACKING RESTRICTED (BTQ 4.26 & 6.52)</div>
                        <div className="text-red-200 space-y-0.5">
                          {ship.mastSectionsLost.length > 0 && (
                            <div>• {ship.mastSectionsLost.length} mast section{ship.mastSectionsLost.length > 1 ? 's' : ''} lost - cannot tack</div>
                          )}
                          {ship.rudder && (
                            <div>• Rudder destroyed - cannot tack</div>
                          )}
                          {ship.wheel && (
                            <div>• Wheel destroyed - cannot tack</div>
                          )}
                          {['Calm', 'Slight breeze', 'Light breeze'].includes(wind.strength) && (
                            <div>• Wind too light ({wind.strength}) - cannot tack</div>
                          )}
                          <div className="text-yellow-300 mt-1">✓ Use WEARING instead (turn stern through wind)</div>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2 mb-2">
                      <div>
                        <label className="stat-label block mb-1 parchment-text">Point of Sail</label>
                        <select
                          value={ship.pos}
                          onChange={(e) => {
                            setShips(ships.map(s => 
                              s.id === ship.id ? { ...s, pos: e.target.value } : s
                            ));
                          }}
                          className="w-full bg-[#4a3f2f] border border-[#1a1410] rounded px-2 py-1 text-xs text-[#e8dfc8]"
                        >
                          <option value="QR">QR</option>
                          <option value="Ru">Ru</option>
                          <option value="RN">RN</option>
                          <option value="B">B</option>
                          <option value="D">D</option>
                        </select>
                      </div>

                      <div>
                        <label className="stat-label block mb-1 parchment-text">
                          Turn Pts (max {turnCap}
                          {ship.rudder && ' -50% rudder'}
                          {ship.wheel && ' -25% wheel'})
                        </label>
                        <input
                          type="number"
                          value={ship.turnPoints}
                          min="0"
                          max={turnCap}
                          onChange={(e) => {
                            const val = Math.min(turnCap, Math.max(0, parseInt(e.target.value) || 0));
                            setShips(ships.map(s => 
                              s.id === ship.id ? { ...s, turnPoints: val } : s
                            ));
                          }}
                          className="w-full bg-[#4a3f2f] border border-[#1a1410] rounded px-2 py-1 text-xs text-[#e8dfc8]"
                        />
                        {(ship.rudder || ship.wheel) && (
                          <div className="mt-1 text-xs text-red-400">
                            {ship.rudder && '🎯 Rudder lost'}
                            {ship.rudder && ship.wheel && ' • '}
                            {ship.wheel && '🎯 Wheel lost'}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="stat-label block mb-1 parchment-text">Last Move (mm)</label>
                        <input
                          type="number"
                          value={ship.lastMove}
                          min="0"
                          onChange={(e) => {
                            const val = Math.max(0, parseInt(e.target.value) || 0);
                            setShips(ships.map(s => 
                              s.id === ship.id ? { ...s, lastMove: val } : s
                            ));
                          }}
                          className="w-full bg-[#4a3f2f] border border-[#1a1410] rounded px-2 py-1 text-xs text-[#e8dfc8]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2 text-xs mb-2">
                      <div className="p-2 bg-[#4a3f2f] rounded">
                        <div style={{ color: "#c9b896" }} className="mb-1">Base Speed:</div>
                        <div className="font-mono text-lg text-green-400">{movement.base}mm</div>
                      </div>
                      <div className="p-2 bg-[#4a3f2f] rounded">
                        <div style={{ color: "#c9b896" }} className="mb-1">Max After Damage:</div>
                        <div className={`font-mono text-lg ${
                          ship.sailsLost.length > 0 ? 'text-yellow-400' : 'text-[#c5a572]'
                        }`}>{movement.maxSpeed}mm</div>
                        {ship.sailsLost.length > 0 && (
                          <div className="text-xs text-red-400 mt-1">
                            -{Math.round((ship.sailsLost.length / ship.sails) * 100)}% sails lost
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-3 bg-[#d4c4a8] rounded border border-cyan-600 text-[#2a1810]">
                      <div className="text-xs mb-1">Allowed Range This Turn:</div>
                      <div className="font-mono text-xl text-[#c5a572] font-bold">{movement.allowedRange}</div>
                      {ship.sailsLost.length > 0 && (
                        <div className="mt-2 p-2 bg-red-900/30 border border-red-700 rounded text-xs">
                          <div className="text-red-300 font-bold">⛵ Sail Damage Impact</div>
                          <div className="text-red-200 mb-1">
                            Lost {ship.sailsLost.length}/{ship.sails} sails = 
                            -{Math.round(movement.base * (ship.sailsLost.length / ship.sails) * 100) / 100}mm speed
                          </div>
                          <div className="text-xs text-red-300">
                            Lost: {ship.sailsLost.map(s => s.name).join(', ')}
                          </div>
                        </div>
                      )}
                      {movement.sailingCrewPenalty && (
                        <div className="mt-2 p-2 bg-orange-900/30 border border-orange-700 rounded text-xs">
                          <div className="text-orange-300 font-bold">
                            {movement.isDriftOnly ? '⚠️ DRIFT ONLY MODE!' : '👥 Insufficient Sailing Crew!'}
                          </div>
                          {movement.isDriftOnly ? (
                            <div className="space-y-1">
                              <div className="text-red-300 font-bold">
                                Zero or minimal crew assigned!
                              </div>
                              <div className="text-orange-200">
                                Ship can only drift: Maximum {movement.driftSpeed}mm
                              </div>
                            </div>
                          ) : (
                            <div className="text-orange-200">
                              Speed reduced by {movement.sailingCrewPenaltyPercent}% 
                              (gradual penalty in 10% increments)
                            </div>
                          )}
                          <div className="text-xs text-orange-300 mt-1">
                            Required: {calculateRequiredSailingCrew(ship)} | 
                            Assigned: {ship.crewAssignments?.sailingCrew || 0}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'gunnery' && (
          <div className="wood-border p-4 sm:p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-3 gold-accent heading-font">Gunnery</h2>
            
            {/* Heavy Weather Warning Banner */}
            {isHeavyWeather(wind.strength) && ships.some(s => isTwoDeckerShip(s.class)) && (
              <div className="mb-3 p-3 bg-blue-900/30 border-2 border-blue-700 rounded text-xs">
                <div className="font-bold text-blue-300 mb-1 flex items-center gap-2">
                  🌊 HEAVY WEATHER - LOWER GUNPORTS CLOSED
                </div>
                <div className="text-blue-200 space-y-1">
                  <div>• Wind: <strong>{wind.strength}</strong> - Too rough to open lower deck gunports</div>
                  <div>• Two-decker ships (1st-4th rates) can only fire upper deck guns</div>
                  <div>• Heaviest caliber long guns are unavailable</div>
                  {ships.filter(s => isTwoDeckerShip(s.class)).map(ship => {
                    const lowerGuns = getLowerDeckGuns(ship);
                    const lowerPoundage = lowerGuns.length > 0 ? lowerGuns[0].poundage : 0;
                    const lowerCount = lowerGuns.reduce((sum, g) => sum + g.count, 0);
                    return lowerPoundage > 0 ? (
                      <div key={ship.id} className="text-yellow-300 font-bold mt-1">
                        ⚠️ {ship.name}: {lowerCount}× {lowerPoundage}# guns CLOSED
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2">
                <div>
                  <label className="stat-label block mb-1 parchment-text">Firing Ship</label>
                  <select
                    value={gunneryForm.firingShipId}
                    onChange={(e) => setGunneryForm(prev => ({ ...prev, firingShipId: e.target.value }))}
                    className="w-full bg-[#3a2f1f] border-2 border-[#2a1f0f] shadow-inner rounded px-2 py-1 text-xs text-[#e8dfc8]"
                  >
                    <option value="">Select...</option>
                    {ships.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="stat-label block mb-1 parchment-text">Target Ship</label>
                  <select
                    value={gunneryForm.targetShipId}
                    onChange={(e) => setGunneryForm(prev => ({ ...prev, targetShipId: e.target.value }))}
                    className="w-full bg-[#3a2f1f] border-2 border-[#2a1f0f] shadow-inner rounded px-2 py-1 text-xs text-[#e8dfc8]"
                  >
                    <option value="">Select...</option>
                    {ships.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2">
                <div>
                  <label className="stat-label block mb-1 parchment-text">Firing Arc</label>
                  <select
                    value={gunneryForm.arc}
                    onChange={(e) => setGunneryForm(prev => ({ ...prev, arc: e.target.value }))}
                    className="w-full bg-[#3a2f1f] border-2 border-[#2a1f0f] shadow-inner rounded px-2 py-1 text-xs text-[#e8dfc8]"
                  >
                    <option>Port</option>
                    <option>Starboard</option>
                    <option>Bow</option>
                    <option>Stern</option>
                  </select>
                </div>
                <div>
                  <label className="stat-label block mb-1 parchment-text">Target Location</label>
                  <select
                    value={gunneryForm.targetLocation}
                    onChange={(e) => setGunneryForm(prev => ({ ...prev, targetLocation: e.target.value }))}
                    className="w-full bg-[#3a2f1f] border-2 border-[#2a1f0f] shadow-inner rounded px-2 py-1 text-xs text-[#e8dfc8]"
                  >
                    <option>Port</option>
                    <option>Starboard</option>
                    <option>Bow</option>
                    <option>Stern</option>
                  </select>
                </div>
                <div>
                  <label className="stat-label block mb-1 parchment-text">Distance</label>
                  <input
                    type="number"
                    value={gunneryForm.distance}
                    onChange={(e) => setGunneryForm(prev => ({ ...prev, distance: parseFloat(e.target.value) }))}
                    className="w-full bg-[#3a2f1f] border-2 border-[#2a1f0f] shadow-inner rounded px-2 py-1 text-xs text-[#e8dfc8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2">
                <div>
                  <label className="stat-label block mb-1 parchment-text">Shot</label>
                  <select
                    value={gunneryForm.shotType}
                    onChange={(e) => setGunneryForm(prev => ({ ...prev, shotType: e.target.value }))}
                    className="w-full bg-[#3a2f1f] border-2 border-[#2a1f0f] shadow-inner rounded px-2 py-1 text-xs text-[#e8dfc8]"
                  >
                    <option>Ball</option>
                    <option>Double</option>
                    <option>Dismantling</option>
                    <option>Grape</option>
                    <option>Canister</option>
                  </select>
                </div>
                <div>
                  <label className="stat-label block mb-1 parchment-text">Aim</label>
                  <select
                    value={gunneryForm.aimType}
                    onChange={(e) => setGunneryForm(prev => ({ ...prev, aimType: e.target.value }))}
                    className="w-full bg-[#3a2f1f] border-2 border-[#2a1f0f] shadow-inner rounded px-2 py-1 text-xs text-[#e8dfc8]"
                  >
                    <option>Hull</option>
                    <option>Rigging</option>
                    <option>Crew</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <div>
                  <label className="stat-label block mb-1 parchment-text">Rake</label>
                  <select
                    value={gunneryForm.rakeType}
                    onChange={(e) => setGunneryForm(prev => ({ ...prev, rakeType: e.target.value }))}
                    className="w-full bg-[#3a2f1f] border-2 border-[#2a1f0f] shadow-inner rounded px-2 py-1 text-xs text-[#e8dfc8]"
                  >
                    <option>None</option>
                    <option>Bow</option>
                    <option>Stern</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={gunneryForm.useInitialBroadside}
                  onChange={(e) => setGunneryForm(prev => ({ ...prev, useInitialBroadside: e.target.checked }))}
                />
                <label className="text-xs">Use Initial Broadside (+50)</label>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={gunneryForm.halfDamage}
                  onChange={(e) => setGunneryForm(prev => ({ ...prev, halfDamage: e.target.checked }))}
                />
                <label className="text-xs">Partial Broadside (÷2)</label>
              </div>

              <button 
                onClick={executeGunnery} 
                style={{ background: "linear-gradient(135deg, #8b1a1a 0%, #a52a2a 100%)" }}
                className="w-full px-3 py-2 rounded font-bold text-xs sm:text-sm min-h-[44px]"
              >
                🔥 FIRE!
              </button>

              {lastGunneryResult && (
                <div className="mt-2 p-2 bg-green-900/20 border-2 border-green-600 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-green-300 font-bold text-xs sm:text-sm">✓ HIT!</div>
                    <button onClick={() => setLastGunneryResult(null)} className="px-2 py-0.5 bg-[#3a2f1f] rounded text-xs text-[#e8dfc8]">
                      Clear
                    </button>
                  </div>
                  <div className="text-xs">
                    <div className="mb-1">
                      <strong>{lastGunneryResult.firingShip}</strong> ({lastGunneryResult.arc}) → 
                      <strong> {lastGunneryResult.targetShip}</strong> ({lastGunneryResult.targetLocation})
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2 mb-2 p-2 bg-[#d4c4a8]/50 rounded text-[#2a1810]">
                      <div className="text-center">
                        <div className="text-xs font-semibold">Hits</div>
                        <div className="text-lg font-bold text-green-700">{lastGunneryResult.totalHits}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-semibold">Damage</div>
                        <div className="text-lg font-bold text-red-700">{lastGunneryResult.totalDamage}</div>
                      </div>
                    </div>
                    {lastGunneryResult.aimType === 'Crew' && (
                      <div className="mb-2 p-2 bg-red-900/30 border border-red-700 rounded text-center text-xs">
                        💀 {lastGunneryResult.crewLost} casualties
                      </div>
                    )}
                    {lastGunneryResult.unmannedGuns && (
                      <div className="mb-2 p-2 bg-orange-900/30 border border-orange-700 rounded text-xs">
                        <div className="text-orange-300 font-bold">⚠️ Insufficient Gun Crews!</div>
                        <div className="text-orange-200">
                          Only {lastGunneryResult.gunsFiring} of {lastGunneryResult.gunsAvailable} guns manned
                        </div>
                        <div className="text-xs text-orange-300 mt-1">
                          {lastGunneryResult.unmannedGuns} guns unmanned (need full crew per gun)
                        </div>
                      </div>
                    )}
                    <button
                      onClick={applyDamage}
                      className="w-full px-2 py-1 bg-orange-600 hover:bg-orange-700 rounded font-bold text-xs min-h-[44px]"
                    >
                      ⚡ APPLY DAMAGE
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'damage' && (
          <div className="wood-border p-4 sm:p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-3 gold-accent heading-font">Damage Status</h2>
            
            <div className="mb-3 p-2 bg-[#3a2f1f]/50 rounded border border-[#8b6f47]">
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={usePvnSurrender}
                  onChange={(e) => setUsePvnSurrender(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="font-medium">⚖️ Apply PVN Ratio Surrender Penalties (6.95 & 6.96)</span>
              </label>
              <div className="text-xs mt-1 pl-6" style={{ color: "#c9b896" }}>
                Deduct SP based on ship size/PVN ratios (Single Ship: 6.95, Unsupported Ship: 6.96)
              </div>
            </div>
            
            {ships.length === 0 ? (
              <div style={{ color: "#c9b896" }} className="text-center py-8 text-xs">No ships</div>
            ) : (
              <div className="space-y-2">
                {ships.map(ship => {
                  const hullPct = Math.floor((ship.hullDamage / ship.hvn) * 100);
                  const sailPct = Math.floor((ship.sailsLost.length / ship.sails) * 100);
                  
                  return (
                    <div key={ship.id} className="bg-[#3a2f1f] text-[#d9d0b8] rounded p-2 border-2 border-[#2a1f0f] shadow-inner">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-xs">{ship.name}</h3>
                          {usePvnSurrender && (
                            <span className="px-1 py-0.5 rounded text-xs font-bold bg-[#4a3f2f] text-[#d4af37] border border-[#8b6f47]">
                              PVN: {ship.pvn.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-1 items-center">
                          {ship.status === 'Exploded' && (
                            <span className="px-1 py-0.5 rounded text-xs font-bold bg-red-900 text-yellow-400 animate-pulse">
                              💥
                            </span>
                          )}
                          {ship.sp === 0 && ship.status !== 'Exploded' && (
                            <span className="px-1 py-0.5 rounded text-xs font-bold bg-white text-black">
                              ⚑
                            </span>
                          )}
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            ship.sp >= 7 ? 'bg-green-700' :
                            ship.sp >= 4 ? 'bg-yellow-700' :
                            'bg-red-700'
                          }`}>
                            SP {ship.sp}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <div className="p-1.5 bg-[#4a3f2f] rounded text-center">
                          <div style={{ color: "#c9b896" }} className="text-xs mb-0.5">Hull</div>
                          <div className={`text-sm font-bold ${hullPct >= 80 ? 'text-red-400' : hullPct >= 50 ? 'text-yellow-400' : 'text-green-400'}`}>
                            {100 - hullPct}%
                          </div>
                        </div>
                        <div className="p-1.5 bg-[#4a3f2f] rounded text-center">
                          <div style={{ color: "#c9b896" }} className="text-xs mb-0.5">Sails</div>
                          <div className={`text-sm font-bold ${sailPct >= 70 ? 'text-red-400' : sailPct >= 40 ? 'text-yellow-400' : 'text-green-400'}`}>
                            {ship.sails - ship.sailsLost.length}
                          </div>
                        </div>
                        <div className="p-1.5 bg-[#4a3f2f] rounded text-center">
                          <div style={{ color: "#c9b896" }} className="text-xs mb-0.5">Crew</div>
                          <div className="text-sm font-bold text-[#e8dfc8]">
                            {ship.crew - ship.crewLoss}
                          </div>
                        </div>
                      </div>

                      {ship.fires.length > 0 && (
                        <div className="p-2 bg-orange-900/30 border border-orange-700 rounded text-xs mb-2">
                          <div className="flex items-center gap-1 mb-1">
                            <Flame className="w-3 h-3 text-orange-400" />
                            <span className="font-bold text-orange-300">{ship.fires.length} Fire{ship.fires.length > 1 ? 's' : ''}</span>
                          </div>
                          {ship.fires.map((fire, idx) => (
                            <div key={fire.id} className="text-orange-200">
                              #{idx + 1}: Age {fire.age}, {fire.intensity} {fire.age >= 4 && <span className="text-red-400 font-bold">(⚠️ Explosion risk!)</span>}
                            </div>
                          ))}
                          
                          <div className="flex gap-1 mt-2">
                            <button
                              onClick={() => toggleOrganizedFireParty(ship.id)}
                              className={`flex-1 px-2 py-1 rounded text-xs font-medium flex items-center justify-center gap-1 ${
                                ship.organizedFireParty 
                                  ? 'bg-orange-700 text-white border-2 border-orange-500' 
                                  : 'bg-[#3a2f1f] text-[#d4af37] hover:bg-[#2a1f0f] border-2 border-[#8b6f47]'
                              }`}
                            >
                              <span>{ship.organizedFireParty ? '🔥' : '👥'}</span>
                              <span>{ship.organizedFireParty ? 'Fighting' : 'Fire Party'}</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('=== FLOOD MAG BUTTON CLICKED ===');
                                console.log('Ship:', ship.name);
                                console.log('Ship ID:', ship.id);
                                console.log('Magazine Flooded:', ship.magazineFlooded);
                                
                                if (ship.magazineFlooded) {
                                  addLog(`${ship.name}: Magazine already flooded`, 'info');
                                  alert('Magazine already flooded!');
                                  return;
                                }
                                
                                // Simple direct flood without confirmation for testing
                                console.log('About to flood magazine...');
                                floodMagazine(ship.id);
                                addLog(`💧 ${ship.name}: FLOOD MAGAZINE CLICKED`, 'success');
                                alert('Magazine flooded!');
                              }}
                              disabled={ship.magazineFlooded}
                              className={`flex-1 px-2 py-1 rounded text-xs font-medium border-2 ${
                                ship.magazineFlooded
                                  ? 'bg-blue-900/70 text-blue-200 border-blue-600 cursor-not-allowed'
                                  : 'bg-blue-700 text-white hover:bg-blue-600 border-blue-500'
                              }`}
                              type="button"
                            >
                              {ship.magazineFlooded ? '✓ 💧 Flooded' : '💧 Flood Mag'}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Manual Damage Controls */}
                      <div className="p-2 bg-[#2a1f0f]/50 border border-[#8b6f47] rounded text-xs mb-2">
                        <div className="font-bold text-[#d4af37] mb-1">🎛️ Manual Controls</div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => manualRemoveSail(ship.id)}
                            disabled={ship.sailsLost.length >= ship.sails}
                            className={`flex-1 px-2 py-1 rounded text-xs font-medium border-2 ${
                              ship.sailsLost.length >= ship.sails
                                ? 'bg-gray-700/50 text-gray-400 border-gray-600 cursor-not-allowed'
                                : 'bg-[#3a2f1f] text-[#d4af37] hover:bg-[#2a1f0f] border-[#8b6f47]'
                            }`}
                          >
                            ✂️ Remove Sail ({ship.sails - ship.sailsLost.length} left)
                          </button>
                          <button
                            onClick={() => manualStartFire(ship.id)}
                            className="flex-1 px-2 py-1 rounded text-xs font-medium bg-orange-700 text-white hover:bg-orange-600 border-2 border-orange-500"
                          >
                            🔥 Start Fire ({ship.fires.length})
                          </button>
                        </div>
                      </div>

                      {(ship.rudder || ship.wheel || ship.magazineFlooded) && (
                        <div className="p-2 bg-red-900/30 border border-red-700 rounded text-xs space-y-1">
                          {ship.rudder && <div className="text-red-300">🎯 Rudder Lost</div>}
                          {ship.wheel && <div className="text-red-300">🎯 Wheel Lost</div>}
                          {ship.magazineFlooded && <div className="text-blue-300">💧 Magazine Flooded (All guns disabled)</div>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'boarding' && (
          <div className="wood-border p-4 sm:p-6 rounded-lg">
            <h2 className="text-xs sm:text-sm font-bold mb-3 gold-accent heading-font">⚔️ Boarding Actions</h2>
            
            {ships.filter(s => s.grappled && s.status === 'Active').length === 0 ? (
              <div style={{ color: "#c9b896" }} className="text-center py-8 text-xs">
                No ships grappled. Use Ships tab to grapple ships together.
              </div>
            ) : (
              ships.filter(s => s.grappled && s.status === 'Active').map(ship => {
                const grappledShip = ships.find(s => s.id === ship.grappled);
                if (!grappledShip) return null;
                
                return (
                  <div key={ship.id} className="bg-[#3a2f1f] text-[#d9d0b8] rounded p-2 sm:p-3 mb-3">
                    <h3 className="text-lg font-bold mb-3 gold-accent heading-font">
                      {ship.name} vs {grappledShip.name}
                    </h3>
                    
                    {ship.grappledTurns < 1 && (
                      <div className="bg-yellow-900/30 border border-yellow-600 rounded p-2 mb-2 text-xs">
                        ⚠️ Must wait 1 turn after grappling before boarding actions
                      </div>
                    )}
                    
                    {ship.grappledTurns >= 1 && ship.boardingState && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2">
                        <button
                          onClick={() => performBoardingAction(ship.id, grappledShip.id, 'portBulwark')}
                          className={`px-3 py-2 rounded text-xs font-bold ${
                            ship.boardingState.portBulwark === 'attacker' ? 'bg-green-700' :
                            ship.boardingState.portBulwark === 'defender' ? 'bg-red-700' :
                            'bg-[#2a1f0f] hover:bg-slate-500'
                          }`}
                        >
                          Port Bulwark{ship.boardingState.portBulwark === 'attacker' && ' ✓'}
                        </button>
                        <button
                          onClick={() => performBoardingAction(ship.id, grappledShip.id, 'starboardBulwark')}
                          className={`px-3 py-2 rounded text-xs font-bold ${
                            ship.boardingState.starboardBulwark === 'attacker' ? 'bg-green-700' :
                            ship.boardingState.starboardBulwark === 'defender' ? 'bg-red-700' :
                            'bg-[#2a1f0f] hover:bg-slate-500'
                          }`}
                        >
                          Starboard Bulwark{ship.boardingState.starboardBulwark === 'attacker' && ' ✓'}
                        </button>
                        <button
                          onClick={() => performBoardingAction(ship.id, grappledShip.id, 'firstHalfDeck')}
                          className={`px-3 py-2 rounded text-xs font-bold ${
                            ship.boardingState.firstHalfDeck === 'attacker' ? 'bg-green-700' :
                            ship.boardingState.firstHalfDeck === 'defender' ? 'bg-red-700' :
                            'bg-[#2a1f0f] hover:bg-slate-500'
                          }`}
                        >
                          1st Half Deck{ship.boardingState.firstHalfDeck === 'attacker' && ' ✓'}
                        </button>
                        <button
                          onClick={() => performBoardingAction(ship.id, grappledShip.id, 'secondHalfDeck')}
                          className={`px-3 py-2 rounded text-xs font-bold ${
                            ship.boardingState.secondHalfDeck === 'attacker' ? 'bg-green-700' :
                            ship.boardingState.secondHalfDeck === 'defender' ? 'bg-red-700' :
                            'bg-[#2a1f0f] hover:bg-slate-500'
                          }`}
                        >
                          2nd Half Deck{ship.boardingState.secondHalfDeck === 'attacker' && ' (CAPTURE!)'}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'crew' && (
          <div className="wood-border p-4 sm:p-6 rounded-lg">
            <h2 className="text-xs sm:text-sm font-bold mb-3 gold-accent heading-font">👥 Crew Management (Optional M.0)</h2>
            
            {ships.map(ship => (
              <div key={ship.id} className="bg-[#3a2f1f] text-[#d9d0b8] rounded p-2 sm:p-3 mb-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs sm:text-sm font-bold" style={{ color: '#d4af37' }}>{ship.name}</h3>
                  <label className="flex items-center text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ship.crewAssignmentMode}
                      onChange={(e) => toggleCrewAssignmentMode(ship.id, e.target.checked)}
                      className="mr-2"
                    />
                    Use Crew Assignment
                  </label>
                </div>
                
                {ship.crewAssignmentMode && ship.crewAssignments && (
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#1a1410]">
                      <span>Total Available Crew:</span>
                      <strong>{ship.crew - ship.crewLoss}</strong>
                    </div>
                    
                    <div>
                      <label className="flex justify-between items-center mb-1">
                        <span>Gun Crews:</span>
                        <input
                          type="number"
                          min="0"
                          value={ship.crewAssignments.gunCrews}
                          onChange={(e) => updateCrewAssignment(ship.id, 'gunCrews', parseInt(e.target.value) || 0)}
                          className="w-20 bg-[#2a1f0f] rounded px-2 py-1 text-xs text-[#e8dfc8]"
                        />
                      </label>
                      <div style={{ color: "#c9b896" }} className="text-xs pl-2">
                        Required: {calculateRequiredGunCrew(ship)}
                      </div>
                    </div>
                    
                    <div>
                      <label className="flex justify-between items-center mb-1">
                        <span>Sailing Crew:</span>
                        <input
                          type="number"
                          min="0"
                          value={ship.crewAssignments.sailingCrew}
                          onChange={(e) => updateCrewAssignment(ship.id, 'sailingCrew', parseInt(e.target.value) || 0)}
                          className="w-20 bg-[#2a1f0f] rounded px-2 py-1 text-xs text-[#e8dfc8]"
                        />
                      </label>
                      <div style={{ color: "#c9b896" }} className="text-xs pl-2">
                        Required: {calculateRequiredSailingCrew(ship)}
                      </div>
                    </div>
                    
                    <div>
                      <label className="flex justify-between items-center mb-1">
                        <span>Fire Fighting:</span>
                        <input
                          type="number"
                          min="0"
                          value={ship.crewAssignments.fireFighting}
                          onChange={(e) => updateCrewAssignment(ship.id, 'fireFighting', parseInt(e.target.value) || 0)}
                          className="w-20 bg-[#2a1f0f] rounded px-2 py-1 text-xs text-[#e8dfc8]"
                        />
                      </label>
                      <div style={{ color: "#c9b896" }} className="text-xs pl-2">
                        10% per fire recommended
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-[#1a1410]">
                      <div className="flex justify-between">
                        <span>Total Assigned:</span>
                        <strong>
                          {Object.values(ship.crewAssignments).reduce((sum, v) => sum + v, 0)}
                        </strong>
                      </div>
                      <div style={{ color: "#c9b896" }} className="flex justify-between mt-1">
                        <span>Unassigned:</span>
                        <span className={(ship.crew - ship.crewLoss) - Object.values(ship.crewAssignments).reduce((sum, v) => sum + v, 0) < 0 ? 'text-red-400 font-bold' : ''}>
                          {(ship.crew - ship.crewLoss) - Object.values(ship.crewAssignments).reduce((sum, v) => sum + v, 0)}
                        </span>
                      </div>
                      {(ship.crew - ship.crewLoss) - Object.values(ship.crewAssignments).reduce((sum, v) => sum + v, 0) < 0 && (
                        <div className="mt-2 p-2 bg-red-900/30 border border-red-700 rounded text-xs">
                          <div className="text-red-300 font-bold">⚠️ Over-Assigned!</div>
                          <div className="text-red-200">
                            Crew casualties have reduced available crew. Reduce assignments manually.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'log' && (
          <div className="wood-border p-4 sm:p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-3 gold-accent heading-font">Battle Log</h2>
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {log.slice().reverse().map(entry => (
                <div key={entry.id} className={`text-xs p-2 rounded ${
                  entry.type === 'error' ? 'bg-red-900/20 text-red-300' :
                  entry.type === 'success' ? 'bg-green-900/20 text-green-300' :
                  'bg-[#3a2f1f] text-[#d9d0b8]'
                }`}>
                  <span className="text-[#c9b896]">[T{entry.turn}]</span> {entry.message}
                </div>
              ))}
            </div>
          </div>
        )}
        </div>

        {/* Reset Game Confirmation Modal */}
        {showResetConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-[#4a3f2f] text-[#e8dfc8] rounded border-4 border-[#2a1f0f] shadow-2xl-lg p-2 sm:p-4 border-2 border-red-600 max-w-sm">
              <h3 className="text-lg font-bold text-red-400 mb-2">⚠️ Reset Game?</h3>
              <p className="text-[#e8dfc8] mb-2 sm:mb-4 text-xs sm:text-sm">All progress will be lost. Are you sure?</p>
              <div className="flex gap-2">
                <button
                  onClick={performReset}
                  style={{ background: "linear-gradient(135deg, #8b1a1a 0%, #a52a2a 100%)" }}
                  className="flex-1 px-4 py-2 rounded font-bold text-xs sm:text-sm min-h-[44px]"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 px-4 py-2 bg-[#2a1f0f] hover:bg-[#3a2f1f] rounded font-bold text-xs sm:text-sm text-[#e8dfc8]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Restart Turn Confirmation Modal */}
        {showRestartConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-[#4a3f2f] text-[#e8dfc8] rounded border-4 border-[#2a1f0f] shadow-2xl-lg p-2 sm:p-4 border-2 border-yellow-600 max-w-sm">
              <h3 className="text-lg font-bold text-yellow-400 mb-2">↩️ Restart Turn?</h3>
              <p className="text-[#e8dfc8] mb-2 sm:mb-4 text-xs sm:text-sm">Go back to the previous turn?</p>
              <div className="flex gap-2">
                <button
                  onClick={performRestart}
                  className="flex-1 px-4 py-2 bg-[#c5a572] hover:bg-yellow-700 rounded font-bold text-xs sm:text-sm min-h-[44px]"
                >
                  Yes, Restart
                </button>
                <button
                  onClick={() => setShowRestartConfirm(false)}
                  className="flex-1 px-4 py-2 bg-[#2a1f0f] hover:bg-[#3a2f1f] rounded font-bold text-xs sm:text-sm text-[#e8dfc8]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
