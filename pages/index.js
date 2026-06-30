import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, X, Shuffle } from 'lucide-react';
import Head from 'next/head';

export default function DosageCalculationGuide() {
  const [expandedSection, setExpandedSection] = useState('intro');
  const [userAnswers, setUserAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState({});
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [randomProblem, setRandomProblem] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleAnswerChange = (problemId, value) => {
    setUserAnswers({
      ...userAnswers,
      [problemId]: value
    });
  };

  const toggleAnswerDisplay = (problemId) => {
    setShowAnswers({
      ...showAnswers,
      [problemId]: !showAnswers[problemId]
    });
  };

  const isAnswerCorrect = (problemId, correct) => {
    const userAnswer = parseFloat(userAnswers[problemId]);
    const correctAnswer = parseFloat(correct);
    if (isNaN(userAnswer)) return null;
    return Math.abs(userAnswer - correctAnswer) < 0.01;
  };

  // Tutorial problems - step by step with more explanation
  const tutorialProblems = [
    {
      id: 'tut1',
      title: 'Complex Multi-Step Problem: Weight-Based Medication with Unit Conversion',
      question: 'A 35 lb child needs gentamicin 7.5 mg/kg IV infused over 30 minutes. The concentration available is 40 mg/mL. How many mL will you administer?',
      steps: [
        { num: 1, title: 'Convert weight to kg', content: '35 lb ÷ 2.2 lb/kg = 15.9 kg (round to 16 kg for safety)' },
        { num: 2, title: 'Calculate total dose needed', content: '16 kg × 7.5 mg/kg = 120 mg' },
        { num: 3, title: 'Apply dimensional analysis', content: '120 mg × (1 mL / 40 mg) = 3 mL' },
        { num: 4, title: 'Verify the answer', content: 'Check: 3 mL × 40 mg/mL = 120 mg ✓' }
      ],
      setup: '35 lb × (1 kg / 2.2 lb) × (7.5 mg / 1 kg) × (1 mL / 40 mg) = 3 mL',
      explanation: 'This problem requires three conversions: pounds to kg, kg to mg (using the weight-based dose), and mg to mL. Always convert weight first, calculate the dose, then apply the concentration.',
      answer: '3'
    },
    {
      id: 'tut2',
      title: 'Complex Multi-Step Problem: mcg to mg to mL',
      question: 'Order: 250 mcg of digoxin IM. The vial reads 500 mcg/2 mL. How many mL will you administer?',
      steps: [
        { num: 1, title: 'Identify the problem', content: 'You need 250 mcg but your concentration is in mcg/mL' },
        { num: 2, title: 'Set up dimensional analysis', content: '250 mcg × (2 mL / 500 mcg) = ?' },
        { num: 3, title: 'Cancel units', content: 'mcg cancels, leaving mL' },
        { num: 4, title: 'Calculate', content: '(250 × 2) ÷ 500 = 500 ÷ 500 = 1 mL' },
        { num: 5, title: 'Check your math', content: '1 mL × 500 mcg/2 mL = 250 mcg ✓' }
      ],
      setup: '250 mcg × (2 mL / 500 mcg) = 1 mL',
      explanation: 'When units match (both mcg), work directly without converting. The key is setting up the fraction correctly so units cancel.',
      answer: '1'
    },
    {
      id: 'tut3',
      title: 'Drip Rate Problem: Converting mL/hour to drops/minute',
      question: 'You need to infuse 500 mL of normal saline over 4 hours using an IV set that delivers 15 drops/mL. Calculate the drip rate in drops per minute.',
      steps: [
        { num: 1, title: 'Calculate mL per hour', content: '500 mL ÷ 4 hours = 125 mL/hour' },
        { num: 2, title: 'Convert hours to minutes', content: '4 hours = 240 minutes' },
        { num: 3, title: 'Set up the formula', content: '(Total mL × drop factor) ÷ total minutes = drops/min' },
        { num: 4, title: 'Substitute numbers', content: '(500 mL × 15 drops/mL) ÷ 240 minutes = 7500 ÷ 240' },
        { num: 5, title: 'Calculate', content: '7500 ÷ 240 = 31.25 drops/min (round to 31 for counting)' },
        { num: 6, title: 'Verify', content: '31 drops/min × 240 min = 7440 drops = 496 mL (close to 500) ✓' }
      ],
      setup: '(500 mL × 15 drops/mL) ÷ 240 minutes = 31.25 drops/min',
      explanation: 'Drip rate problems need consistent units. Convert everything to the same time unit first, then apply the drop factor. Remember: gravity infusions require you to count drops, so you may need to round.',
      answer: '31.25'
    },
    {
      id: 'tut4',
      title: 'Pediatric Problem: Multiple Conversions',
      question: 'A child weighs 44 lbs. Order: Amoxicillin 30 mg/kg/day in 3 divided doses. Available: amoxicillin 400 mg/5 mL. How many mL for each dose?',
      steps: [
        { num: 1, title: 'Convert weight', content: '44 lbs ÷ 2.2 = 20 kg' },
        { num: 2, title: 'Calculate daily dose', content: '20 kg × 30 mg/kg = 600 mg/day' },
        { num: 3, title: 'Divide by frequency', content: '600 mg ÷ 3 doses = 200 mg per dose' },
        { num: 4, title: 'Apply concentration formula', content: '200 mg × (5 mL / 400 mg) = ?' },
        { num: 5, title: 'Calculate', content: '(200 × 5) ÷ 400 = 1000 ÷ 400 = 2.5 mL per dose' },
        { num: 6, title: 'Final check', content: '2.5 mL × 400 mg/5 mL = 200 mg per dose ✓' }
      ],
      setup: '44 lbs × (1 kg/2.2 lbs) × 30 mg/kg ÷ 3 × (5 mL/400 mg) = 2.5 mL',
      explanation: 'Pediatric dosing requires: weight conversion, dose calculation, frequency division, then concentration application. Always work in order and double-check each step.',
      answer: '2.5'
    }
  ];

  // Comprehensive problem bank - 50+ problems
  const problemBank = [
    // Oral medications - Basic
    { id: 'bank1', category: 'oral', difficulty: 'basic', question: 'Give 500 mg penicillin. Have: 250 mg/5 mL. How many mL?', setup: '500 mg × (5 mL/250 mg) = 10 mL', answer: '10' },
    { id: 'bank2', category: 'oral', difficulty: 'basic', question: 'Give 300 mg amoxicillin. Have: 125 mg/5 mL. How many mL?', setup: '300 mg × (5 mL/125 mg) = 12 mL', answer: '12' },
    { id: 'bank3', category: 'oral', difficulty: 'basic', question: 'Give 750 mg acetaminophen. Have: 500 mg/5 mL. How many mL?', setup: '750 mg × (5 mL/500 mg) = 7.5 mL', answer: '7.5' },
    { id: 'bank4', category: 'oral', difficulty: 'basic', question: 'Give 200 mg ibuprofen. Have: 100 mg/5 mL. How many mL?', setup: '200 mg × (5 mL/100 mg) = 10 mL', answer: '10' },
    { id: 'bank5', category: 'oral', difficulty: 'basic', question: 'Give 1 gram cephalexin. Have: 250 mg tablets. How many tablets?', setup: '1000 mg × (1 tablet/250 mg) = 4 tablets', answer: '4' },
    { id: 'bank6', category: 'oral', difficulty: 'basic', question: 'Give 400 mg metformin. Have: 500 mg tablets. How many tablets?', setup: '400 mg × (1 tablet/500 mg) = 0.8 tablets', answer: '0.8' },
    { id: 'bank7', category: 'oral', difficulty: 'basic', question: 'Give 100 mg aspirin. Have: 500 mg/5 mL. How many mL?', setup: '100 mg × (5 mL/500 mg) = 1 mL', answer: '1' },
    { id: 'bank8', category: 'oral', difficulty: 'basic', question: 'Give 150 mg fluconazole. Have: 50 mg/5 mL. How many mL?', setup: '150 mg × (5 mL/50 mg) = 15 mL', answer: '15' },

    // Oral medications - Intermediate
    { id: 'bank9', category: 'oral', difficulty: 'intermediate', question: 'Give 350 mg metronidazole. Have: 125 mg/5 mL. How many mL?', setup: '350 mg × (5 mL/125 mg) = 14 mL', answer: '14' },
    { id: 'bank10', category: 'oral', difficulty: 'intermediate', question: 'Give 200 mcg digoxin. Have: 0.05 mg/mL. How many mL?', setup: '200 mcg × (1 mg/1000 mcg) × (1 mL/0.05 mg) = 4 mL', answer: '4' },
    { id: 'bank11', category: 'oral', difficulty: 'intermediate', question: 'Give 400 mg ciprofloxacin. Have: 100 mg tablets. How many tablets?', setup: '400 mg × (1 tablet/100 mg) = 4 tablets', answer: '4' },
    { id: 'bank12', category: 'oral', difficulty: 'intermediate', question: 'Give 600 mg ibuprofen. Have: 200 mg/5 mL. How many mL?', setup: '600 mg × (5 mL/200 mg) = 15 mL', answer: '15' },
    { id: 'bank13', category: 'oral', difficulty: 'intermediate', question: 'Give 2 grams amoxicillin. Have: 500 mg tablets. How many tablets?', setup: '2000 mg × (1 tablet/500 mg) = 4 tablets', answer: '4' },

    // Oral medications - Complex
    { id: 'bank14', category: 'oral', difficulty: 'complex', question: 'Give 450 mg azithromycin suspension. Have: 200 mg/5 mL. How many mL?', setup: '450 mg × (5 mL/200 mg) = 11.25 mL', answer: '11.25' },
    { id: 'bank15', category: 'oral', difficulty: 'complex', question: 'Give 0.5 mg digoxin. Have: 0.125 mg tablets. How many tablets?', setup: '0.5 mg × (1 tablet/0.125 mg) = 4 tablets', answer: '4' },

    // Injections - Basic
    { id: 'bank16', category: 'injection', difficulty: 'basic', question: 'Give 10 mg morphine IM. Have: 15 mg/mL. How many mL?', setup: '10 mg × (1 mL/15 mg) = 0.67 mL', answer: '0.67' },
    { id: 'bank17', category: 'injection', difficulty: 'basic', question: 'Give 5 mg diazepam IV. Have: 5 mg/mL. How many mL?', setup: '5 mg × (1 mL/5 mg) = 1 mL', answer: '1' },
    { id: 'bank18', category: 'injection', difficulty: 'basic', question: 'Give 8 mg atropine SQ. Have: 0.4 mg/mL. How many mL?', setup: '8 mg × (1 mL/0.4 mg) = 20 mL', answer: '20' },
    { id: 'bank19', category: 'injection', difficulty: 'basic', question: 'Give 4 mg haloperidol IM. Have: 5 mg/mL. How many mL?', setup: '4 mg × (1 mL/5 mg) = 0.8 mL', answer: '0.8' },
    { id: 'bank20', category: 'injection', difficulty: 'basic', question: 'Give 2.5 mg prochlorperazine IV. Have: 5 mg/mL. How many mL?', setup: '2.5 mg × (1 mL/5 mg) = 0.5 mL', answer: '0.5' },

    // Injections - Intermediate
    { id: 'bank21', category: 'injection', difficulty: 'intermediate', question: 'Give 6 mg morphine IM. Have: 10 mg/mL. How many mL?', setup: '6 mg × (1 mL/10 mg) = 0.6 mL', answer: '0.6' },
    { id: 'bank22', category: 'injection', difficulty: 'intermediate', question: 'Give 0.4 mg atropine IM. Have: 1 mg/mL. How many mL?', setup: '0.4 mg × (1 mL/1 mg) = 0.4 mL', answer: '0.4' },
    { id: 'bank23', category: 'injection', difficulty: 'intermediate', question: 'Give 75 mg meperidine IM. Have: 100 mg/mL. How many mL?', setup: '75 mg × (1 mL/100 mg) = 0.75 mL', answer: '0.75' },
    { id: 'bank24', category: 'injection', difficulty: 'intermediate', question: 'Give 12 mg gentamicin IV. Have: 40 mg/mL. How many mL?', setup: '12 mg × (1 mL/40 mg) = 0.3 mL', answer: '0.3' },

    // Injections - Complex
    { id: 'bank25', category: 'injection', difficulty: 'complex', question: 'Give 350 units of heparin SQ. Have: 1000 units/mL. How many mL?', setup: '350 units × (1 mL/1000 units) = 0.35 mL', answer: '0.35' },
    { id: 'bank26', category: 'injection', difficulty: 'complex', question: 'Give 500 units insulin SQ. Have: 100 units/mL. How many mL?', setup: '500 units × (1 mL/100 units) = 5 mL', answer: '5' },

    // IV Infusions - Basic
    { id: 'bank27', category: 'infusion', difficulty: 'basic', question: 'Infuse 1000 mL over 8 hours via pump. What is the rate in mL/hour?', setup: '1000 mL ÷ 8 hours = 125 mL/hour', answer: '125' },
    { id: 'bank28', category: 'infusion', difficulty: 'basic', question: 'Infuse 500 mL over 2 hours. What is the pump rate?', setup: '500 mL ÷ 2 hours = 250 mL/hour', answer: '250' },
    { id: 'bank29', category: 'infusion', difficulty: 'basic', question: 'Infuse 250 mL D5W over 1 hour. What is the rate?', setup: '250 mL ÷ 1 hour = 250 mL/hour', answer: '250' },
    { id: 'bank30', category: 'infusion', difficulty: 'basic', question: 'Infuse 100 mL over 30 minutes. What rate in mL/hour?', setup: '100 mL ÷ 0.5 hour = 200 mL/hour', answer: '200' },

    // IV Infusions - Intermediate
    { id: 'bank31', category: 'infusion', difficulty: 'intermediate', question: 'Infuse 750 mL antibiotics over 4 hours. What is the pump rate?', setup: '750 mL ÷ 4 hours = 187.5 mL/hour', answer: '187.5' },
    { id: 'bank32', category: 'infusion', difficulty: 'intermediate', question: 'Infuse 300 mL over 45 minutes. Calculate mL/hour.', setup: '300 mL ÷ 0.75 hour = 400 mL/hour', answer: '400' },
    { id: 'bank33', category: 'infusion', difficulty: 'intermediate', question: 'Infuse 200 mL over 20 minutes. What is the rate?', setup: '200 mL ÷ (20÷60) hour = 600 mL/hour', answer: '600' },

    // Drip Rates - Basic
    { id: 'bank34', category: 'dripRate', difficulty: 'basic', question: 'Infuse 1000 mL NS over 8 hours, standard set (15 drops/mL). Calculate drops/min.', setup: '(1000 × 15) ÷ 480 = 31.25 drops/min', answer: '31.25' },
    { id: 'bank35', category: 'dripRate', difficulty: 'basic', question: 'Infuse 500 mL over 4 hours with 10 drops/mL set. What is drip rate?', setup: '(500 × 10) ÷ 240 = 20.8 drops/min', answer: '20.8' },
    { id: 'bank36', category: 'dripRate', difficulty: 'basic', question: 'Infuse 250 mL over 1 hour, microdrip (60 drops/mL). Calculate drops/min.', setup: '(250 × 60) ÷ 60 = 250 drops/min', answer: '250' },

    // Drip Rates - Intermediate
    { id: 'bank37', category: 'dripRate', difficulty: 'intermediate', question: 'Infuse 300 mL over 45 minutes with standard 15 drops/mL set. What is drops/min?', setup: '(300 × 15) ÷ 45 = 100 drops/min', answer: '100' },
    { id: 'bank38', category: 'dripRate', difficulty: 'intermediate', question: 'Run 1000 mL at 100 mL/hour with 15 drops/mL set. Calculate drip rate.', setup: '(100 × 15) ÷ 60 = 25 drops/min', answer: '25' },

    // Drip Rates - Complex
    { id: 'bank39', category: 'dripRate', difficulty: 'complex', question: 'Infuse 500 mL medication over 90 minutes using macrodrip (10 drops/mL). What is drops/min?', setup: '(500 × 10) ÷ 90 = 55.56 drops/min', answer: '55.56' },
    { id: 'bank40', category: 'dripRate', difficulty: 'complex', question: 'Run 2000 mL over 12 hours with standard set. Calculate drops/min (assume 15 drops/mL).', setup: '(2000 × 15) ÷ 720 = 41.67 drops/min', answer: '41.67' },

    // Pediatric - Intermediate
    { id: 'bank41', category: 'pediatric', difficulty: 'intermediate', question: 'Child weighs 22 kg. Order: 20 mg/kg/day of antibiotic divided into 4 doses. How much per dose?', setup: '22 × 20 ÷ 4 = 110 mg per dose', answer: '110' },
    { id: 'bank42', category: 'pediatric', difficulty: 'intermediate', question: 'Child weighs 30 lbs. Order: 10 mg/kg once daily. What is the dose?', setup: '30 ÷ 2.2 × 10 = 136.4 mg', answer: '136.4' },
    { id: 'bank43', category: 'pediatric', difficulty: 'intermediate', question: 'Infant weighs 4 kg. Order: 5 mg/kg IV push of drug. Have: 20 mg/mL. How many mL?', setup: '4 × 5 × (1/20) = 1 mL', answer: '1' },

    // Pediatric - Complex
    { id: 'bank44', category: 'pediatric', difficulty: 'complex', question: 'Child 44 lbs needs 25 mg/kg antibiotic IV. Have: 125 mg/5 mL. How many mL?', setup: '44÷2.2 × 25 × (5÷125) = 20 mL', answer: '20' },
    { id: 'bank45', category: 'pediatric', difficulty: 'complex', question: 'Toddler weighs 15 kg. Order: 30 mg/kg/day in 3 divided doses, concentration 100 mg/5 mL. mL per dose?', setup: '15 × 30 ÷ 3 × (5÷100) = 7.5 mL', answer: '7.5' },

    // Additional Complex Problems
    { id: 'bank46', category: 'oral', difficulty: 'complex', question: 'Give 1.2 grams erythromycin. Have: 400 mg/5 mL. How many mL?', setup: '1200 mg × (5 mL/400 mg) = 15 mL', answer: '15' },
    { id: 'bank47', category: 'injection', difficulty: 'complex', question: 'Give 350 units heparin. Have: 5000 units/mL. How many mL?', setup: '350 units × (1 mL/5000 units) = 0.07 mL', answer: '0.07' },
    { id: 'bank48', category: 'infusion', difficulty: 'complex', question: 'Infuse 150 mL over 15 minutes. What pump rate in mL/hour?', setup: '150 mL ÷ 0.25 hour = 600 mL/hour', answer: '600' },
    { id: 'bank49', category: 'dripRate', difficulty: 'complex', question: 'Run 100 mL/hour on microdrip (60 drops/mL). What is drops/min?', setup: '(100 ÷ 60) × 60 = 100 drops/min', answer: '100' },
    { id: 'bank50', category: 'pediatric', difficulty: 'complex', question: 'Newborn 3.5 kg needs 15 mg/kg/day of medication in 2 doses. Have: 50 mg/5 mL. mL per dose?', setup: '3.5 × 15 ÷ 2 × (5÷50) = 2.625 mL', answer: '2.625' }
  ];

  const filteredProblems = selectedDifficulty === 'all' 
    ? problemBank 
    : problemBank.filter(p => p.difficulty === selectedDifficulty);

  const getRandomProblem = () => {
    const randomIdx = Math.floor(Math.random() * filteredProblems.length);
    setRandomProblem(filteredProblems[randomIdx]);
  };

  const ProblemCard = ({ problem }) => {
    const isCorrect = isAnswerCorrect(problem.id, problem.answer);
    const userValue = userAnswers[problem.id] || '';

    return (
      <div className="bg-white rounded-lg p-6 mb-6 border border-pink-200 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{problem.question}</h3>
            <div className="mt-2 flex gap-2">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                {problem.category}
              </span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                problem.difficulty === 'basic' ? 'bg-green-100 text-green-700' :
                problem.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {problem.difficulty}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Your answer:</label>
          <div className="flex gap-2">
            <input
              type="number"
              step="0.01"
              value={userValue}
              onChange={(e) => handleAnswerChange(problem.id, e.target.value)}
              placeholder="Enter your answer"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            {userValue && isCorrect !== null && (
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                {isCorrect ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <X className="w-5 h-5 text-red-600" />
                )}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => toggleAnswerDisplay(problem.id)}
          className="text-pink-600 hover:text-pink-700 font-medium text-sm mb-4 underline"
        >
          {showAnswers[problem.id] ? 'Hide' : 'Show'} solution
        </button>

        {showAnswers[problem.id] && (
          <div className="bg-lavender-50 rounded-lg p-4 space-y-2">
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Setup:</h4>
              <p className="text-sm text-gray-700 font-mono bg-white p-2 rounded border border-pink-200">{problem.setup}</p>
            </div>
            <div className="pt-2 border-t border-pink-200">
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Answer:</span> <span className="text-pink-600 font-mono">{problem.answer}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const TutorialCard = ({ problem }) => {
    const isCorrect = isAnswerCorrect(problem.id, problem.answer);
    const userValue = userAnswers[problem.id] || '';

    return (
      <div className="bg-white rounded-lg p-6 mb-8 border-l-4 border-pink-400 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{problem.title}</h3>
        
        <div className="bg-lavender-50 p-4 rounded-lg mb-6 border border-lavender-200">
          <p className="text-gray-800 font-semibold">{problem.question}</p>
        </div>

        <div className="space-y-4 mb-6">
          <h4 className="font-semibold text-gray-800">Step-by-step solution:</h4>
          {problem.steps.map((step) => (
            <div key={step.num} className="border-l-4 border-pink-300 pl-4 py-2">
              <p className="font-semibold text-pink-600">Step {step.num}: {step.title}</p>
              <p className="text-gray-700 text-sm mt-1">{step.content}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
          <h4 className="font-semibold text-gray-800 mb-2">Formula setup:</h4>
          <p className="text-gray-700 font-mono text-center bg-white p-2 rounded border border-blue-200">{problem.setup}</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg mb-6 border border-yellow-200">
          <h4 className="font-semibold text-gray-800 mb-1">Why this works:</h4>
          <p className="text-gray-700 text-sm">{problem.explanation}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Try it yourself:</label>
          <div className="flex gap-2">
            <input
              type="number"
              step="0.01"
              value={userValue}
              onChange={(e) => handleAnswerChange(problem.id, e.target.value)}
              placeholder="Enter your answer"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            {userValue && isCorrect !== null && (
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                {isCorrect ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <X className="w-5 h-5 text-red-600" />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-pink-200">
          <p className="text-sm text-pink-600 font-semibold">Answer: {problem.answer}</p>
        </div>
      </div>
    );
  };

  const SectionHeader = ({ title, section }) => (
    <div
      onClick={() => toggleSection(section)}
      className="cursor-pointer bg-gradient-to-r from-pink-50 to-lavender-50 p-4 rounded-lg border-l-4 border-pink-300 hover:border-pink-400 transition mb-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {expandedSection === section ? (
          <ChevronUp className="w-5 h-5 text-pink-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-pink-600" />
        )}
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Dosage Calculation - Dimensional Analysis</title>
        <meta name="description" content="Interactive dosage calculation tutoring site with tutorials and 50+ practice problems." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{ backgroundColor: '#faf8f7' }} className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dosage Calculation</h1>
            <p className="text-lg text-gray-600">Dimensional Analysis Method for Nursing Students</p>
            <div className="mt-4 w-12 h-1 bg-gradient-to-r from-pink-400 to-lavender-400 rounded-full"></div>
          </div>

          {/* Introduction Section */}
          <SectionHeader title="Introduction: How Dimensional Analysis Works" section="intro" />
          {expandedSection === 'intro' && (
            <div className="bg-white rounded-lg p-6 mb-8 border border-pink-200 shadow-sm">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">The Basic Principle</h3>
                  <p className="text-gray-700">Dimensional analysis is a problem-solving method that uses the principle that any quantity can be multiplied by 1 without changing its value. Units cancel out, leaving you with the unit you need.</p>
                </div>
                <div className="bg-lavender-50 p-4 rounded-lg border border-lavender-200">
                  <h4 className="font-semibold text-gray-800 mb-2">Universal Formula</h4>
                  <p className="text-gray-700 font-mono bg-white p-2 rounded border border-lavender-200 text-center">Dose Needed × (Available Amount / Available Strength) = Amount to Give</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Why Use Dimensional Analysis?</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Works for ANY dosage calculation</li>
                    <li>✓ Units cancel clearly—you see errors immediately</li>
                    <li>✓ One method for oral, injection, infusion, drip rates</li>
                    <li>✓ Easy to check your work</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">The Process</h3>
                  <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                    <li>Identify the dose you need to give (with units)</li>
                    <li>Identify what strength you have available</li>
                    <li>Set up the equation using the formula</li>
                    <li>Check that units cancel correctly</li>
                    <li>Calculate and round appropriately</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* Tutorial Section */}
          <SectionHeader title="Step-by-Step Tutorials: Complex Problems Explained" section="tutorials" />
          {expandedSection === 'tutorials' && (
            <div className="space-y-8 mb-8">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-gray-800 text-sm"><span className="font-semibold">How to use this section:</span> Each problem shows a complex calculation broken down into clear steps. Work through each step, then try the problem yourself using the input box at the bottom. This teaches you the pattern before you practice on your own.</p>
              </div>
              {tutorialProblems.map((problem) => (
                <TutorialCard key={problem.id} problem={problem} />
              ))}
            </div>
          )}

          {/* Practice Problem Bank */}
          <SectionHeader title="Practice Problem Bank (50+ Problems)" section="problemBank" />
          {expandedSection === 'problemBank' && (
            <div>
              <div className="bg-white rounded-lg p-4 mb-6 border border-pink-200">
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by difficulty:</label>
                    <div className="flex gap-2 flex-wrap">
                      {['all', 'basic', 'intermediate', 'complex'].map((diff) => (
                        <button
                          key={diff}
                          onClick={() => setSelectedDifficulty(diff)}
                          className={`px-3 py-2 rounded-lg font-medium text-sm transition ${
                            selectedDifficulty === diff
                              ? 'bg-pink-400 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {diff.charAt(0).toUpperCase() + diff.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={getRandomProblem}
                    className="flex items-center gap-2 px-4 py-2 bg-lavender-300 text-purple-800 rounded-lg font-semibold hover:bg-lavender-400 transition w-fit"
                  >
                    <Shuffle className="w-4 h-4" />
                    Get Random Problem
                  </button>
                </div>
              </div>

              {randomProblem && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Random Problem:</h3>
                  <ProblemCard problem={randomProblem} />
                </div>
              )}

              <h3 className="text-lg font-semibold text-gray-800 mb-4">All Problems by Category:</h3>
              <div className="space-y-8">
                {['oral', 'injection', 'infusion', 'dripRate', 'pediatric'].map((category) => {
                  const categoryProblems = filteredProblems.filter(p => p.category === category);
                  if (categoryProblems.length === 0) return null;
                  return (
                    <div key={category}>
                      <h4 className="text-lg font-semibold text-pink-600 mb-4 capitalize">{category === 'dripRate' ? 'Drip Rates' : category}</h4>
                      <div className="space-y-4">
                        {categoryProblems.map((problem) => (
                          <ProblemCard key={problem.id} problem={problem} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 p-6 bg-gradient-to-r from-pink-50 to-lavender-50 rounded-lg border border-pink-200">
            <h3 className="font-semibold text-gray-800 mb-3">Remember</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>• Always include units in every step—they tell you if you've set up the problem correctly</li>
              <li>• If units don't cancel properly, stop and check your setup</li>
              <li>• Double-check decimal placement—critical for medication safety</li>
              <li>• When in doubt, ask your preceptor or pharmacist before administering</li>
              <li>• Start with tutorial problems to understand the pattern, then practice with the problem bank</li>
            </ul>
          </div>
        </div>

        <style jsx>{`
          .lavender-50 {
            background-color: #f3e8fa;
          }
          .lavender-300 {
            background-color: #dbb9ff;
          }
          .lavender-400 {
            background-color: #c99cff;
          }
        `}</style>
      </div>
    </>
  );
}
