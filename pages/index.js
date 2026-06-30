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

  // Tutorial problems with detailed work shown
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
      workSteps: [
        {
          step: 'Step 1: Convert pounds to kilograms',
          work: ['35 lb × (1 kg / 2.2 lb) = 15.9 kg ≈ 16 kg']
        },
        {
          step: 'Step 2: Calculate dose based on weight',
          work: ['16 kg × (7.5 mg / 1 kg) = 120 mg']
        },
        {
          step: 'Step 3: Convert mg to mL using concentration',
          work: ['120 mg × (1 mL / 40 mg) =', '120 mL / 40 = 3 mL']
        }
      ],
      answer: '3'
    },
    {
      id: 'tut2',
      title: 'Unit Conversion: mcg to mL',
      question: 'Order: 250 mcg of digoxin IM. The vial reads 500 mcg/2 mL. How many mL will you administer?',
      steps: [
        { num: 1, title: 'Identify the problem', content: 'You need 250 mcg and have 500 mcg/2 mL' },
        { num: 2, title: 'Set up dimensional analysis', content: '250 mcg × (2 mL / 500 mcg)' },
        { num: 3, title: 'Cancel units', content: 'mcg cancels out, leaving mL' },
        { num: 4, title: 'Calculate', content: '(250 × 2) ÷ 500 = 1 mL' }
      ],
      workSteps: [
        {
          step: 'Given: Need 250 mcg, Have: 500 mcg/2 mL',
          work: ['Set up the fraction:']
        },
        {
          step: 'Write dimensional analysis with units',
          work: ['250 mcg × (2 mL / 500 mcg)', '', 'Cancel mcg from numerator and denominator:']
        },
        {
          step: 'Multiply and divide',
          work: ['(250 × 2 mL) / 500', '= 500 mL / 500', '= 1 mL']
        }
      ],
      answer: '1'
    },
    {
      id: 'tut3',
      title: 'Drip Rate: Converting to drops/minute',
      question: 'Infuse 500 mL of normal saline over 4 hours using an IV set that delivers 15 drops/mL. Calculate the drip rate in drops per minute.',
      steps: [
        { num: 1, title: 'Convert hours to minutes', content: '4 hours = 240 minutes' },
        { num: 2, title: 'Set up the formula', content: '(Total mL × drop factor) ÷ total minutes' },
        { num: 3, title: 'Substitute values', content: '(500 mL × 15 drops/mL) ÷ 240 minutes' },
        { num: 4, title: 'Calculate', content: '7500 drops ÷ 240 = 31.25 drops/min' }
      ],
      workSteps: [
        {
          step: 'Convert time to minutes',
          work: ['4 hours × 60 minutes/hour = 240 minutes']
        },
        {
          step: 'Set up dimensional analysis',
          work: ['500 mL × (15 drops / 1 mL) × (1 hour / 60 minutes)', '', 'Or use: (500 mL × 15 drops/mL) ÷ 240 minutes']
        },
        {
          step: 'Calculate step by step',
          work: ['500 × 15 = 7500 drops', '7500 drops ÷ 240 minutes', '= 31.25 drops/minute']
        }
      ],
      answer: '31.25'
    },
    {
      id: 'tut4',
      title: 'Pediatric: Multiple Conversions in One Problem',
      question: 'A child weighs 44 lbs. Order: Amoxicillin 30 mg/kg/day in 3 divided doses. Available: 400 mg/5 mL. How many mL for each dose?',
      steps: [
        { num: 1, title: 'Convert weight', content: '44 lbs ÷ 2.2 = 20 kg' },
        { num: 2, title: 'Calculate daily dose', content: '20 kg × 30 mg/kg = 600 mg/day' },
        { num: 3, title: 'Divide by number of doses', content: '600 mg ÷ 3 = 200 mg per dose' },
        { num: 4, title: 'Convert mg to mL', content: '200 mg × (5 mL / 400 mg) = 2.5 mL' }
      ],
      workSteps: [
        {
          step: 'Step 1: Convert pounds to kg',
          work: ['44 lb × (1 kg / 2.2 lb) = 20 kg']
        },
        {
          step: 'Step 2: Calculate total daily dose',
          work: ['20 kg × (30 mg / 1 kg) = 600 mg/day']
        },
        {
          step: 'Step 3: Divide into doses',
          work: ['600 mg ÷ 3 doses = 200 mg/dose']
        },
        {
          step: 'Step 4: Convert mg to mL',
          work: ['200 mg × (5 mL / 400 mg)', '= (200 × 5) mL / 400', '= 1000 mL / 400', '= 2.5 mL per dose']
        }
      ],
      answer: '2.5'
    }
  ];

  // Problem bank with work steps
  const problemBank = [
    { id: 'bank1', category: 'oral', difficulty: 'basic', question: 'Give 500 mg penicillin. Have: 250 mg/5 mL. How many mL?', work: ['500 mg × (5 mL / 250 mg)', '= 2500 mL / 250', '= 10 mL'], answer: '10' },
    { id: 'bank2', category: 'oral', difficulty: 'basic', question: 'Give 300 mg amoxicillin. Have: 125 mg/5 mL. How many mL?', work: ['300 mg × (5 mL / 125 mg)', '= 1500 mL / 125', '= 12 mL'], answer: '12' },
    { id: 'bank3', category: 'oral', difficulty: 'basic', question: 'Give 750 mg acetaminophen. Have: 500 mg/5 mL. How many mL?', work: ['750 mg × (5 mL / 500 mg)', '= 3750 mL / 500', '= 7.5 mL'], answer: '7.5' },
    { id: 'bank4', category: 'oral', difficulty: 'basic', question: 'Give 200 mg ibuprofen. Have: 100 mg/5 mL. How many mL?', work: ['200 mg × (5 mL / 100 mg)', '= 1000 mL / 100', '= 10 mL'], answer: '10' },
    { id: 'bank5', category: 'oral', difficulty: 'basic', question: 'Give 1 gram cephalexin. Have: 250 mg tablets. How many tablets?', work: ['1000 mg × (1 tablet / 250 mg)', '= 1000 / 250', '= 4 tablets'], answer: '4' },
    { id: 'bank6', category: 'oral', difficulty: 'basic', question: 'Give 400 mg metformin. Have: 500 mg tablets. How many tablets?', work: ['400 mg × (1 tablet / 500 mg)', '= 400 / 500', '= 0.8 tablets'], answer: '0.8' },
    { id: 'bank7', category: 'oral', difficulty: 'basic', question: 'Give 100 mg aspirin. Have: 500 mg/5 mL. How many mL?', work: ['100 mg × (5 mL / 500 mg)', '= 500 mL / 500', '= 1 mL'], answer: '1' },
    { id: 'bank8', category: 'oral', difficulty: 'basic', question: 'Give 150 mg fluconazole. Have: 50 mg/5 mL. How many mL?', work: ['150 mg × (5 mL / 50 mg)', '= 750 mL / 50', '= 15 mL'], answer: '15' },

    { id: 'bank9', category: 'oral', difficulty: 'intermediate', question: 'Give 350 mg metronidazole. Have: 125 mg/5 mL. How many mL?', work: ['350 mg × (5 mL / 125 mg)', '= 1750 mL / 125', '= 14 mL'], answer: '14' },
    { id: 'bank10', category: 'oral', difficulty: 'intermediate', question: 'Give 200 mcg digoxin. Have: 0.05 mg/mL. How many mL?', work: ['200 mcg × (1 mg / 1000 mcg) × (1 mL / 0.05 mg)', '= 0.2 mg × (1 mL / 0.05 mg)', '= 0.2 mL / 0.05', '= 4 mL'], answer: '4' },
    { id: 'bank11', category: 'oral', difficulty: 'intermediate', question: 'Give 400 mg ciprofloxacin. Have: 100 mg tablets. How many tablets?', work: ['400 mg × (1 tablet / 100 mg)', '= 400 / 100', '= 4 tablets'], answer: '4' },
    { id: 'bank12', category: 'oral', difficulty: 'intermediate', question: 'Give 600 mg ibuprofen. Have: 200 mg/5 mL. How many mL?', work: ['600 mg × (5 mL / 200 mg)', '= 3000 mL / 200', '= 15 mL'], answer: '15' },
    { id: 'bank13', category: 'oral', difficulty: 'intermediate', question: 'Give 2 grams amoxicillin. Have: 500 mg tablets. How many tablets?', work: ['2000 mg × (1 tablet / 500 mg)', '= 2000 / 500', '= 4 tablets'], answer: '4' },

    { id: 'bank14', category: 'oral', difficulty: 'complex', question: 'Give 450 mg azithromycin. Have: 200 mg/5 mL. How many mL?', work: ['450 mg × (5 mL / 200 mg)', '= 2250 mL / 200', '= 11.25 mL'], answer: '11.25' },
    { id: 'bank15', category: 'oral', difficulty: 'complex', question: 'Give 0.5 mg digoxin. Have: 0.125 mg tablets. How many tablets?', work: ['0.5 mg × (1 tablet / 0.125 mg)', '= 0.5 / 0.125', '= 4 tablets'], answer: '4' },

    { id: 'bank16', category: 'injection', difficulty: 'basic', question: 'Give 10 mg morphine IM. Have: 15 mg/mL. How many mL?', work: ['10 mg × (1 mL / 15 mg)', '= 10 mL / 15', '= 0.67 mL'], answer: '0.67' },
    { id: 'bank17', category: 'injection', difficulty: 'basic', question: 'Give 5 mg diazepam IV. Have: 5 mg/mL. How many mL?', work: ['5 mg × (1 mL / 5 mg)', '= 5 mL / 5', '= 1 mL'], answer: '1' },
    { id: 'bank18', category: 'injection', difficulty: 'basic', question: 'Give 8 mg atropine SQ. Have: 0.4 mg/mL. How many mL?', work: ['8 mg × (1 mL / 0.4 mg)', '= 8 mL / 0.4', '= 20 mL'], answer: '20' },
    { id: 'bank19', category: 'injection', difficulty: 'basic', question: 'Give 4 mg haloperidol IM. Have: 5 mg/mL. How many mL?', work: ['4 mg × (1 mL / 5 mg)', '= 4 mL / 5', '= 0.8 mL'], answer: '0.8' },
    { id: 'bank20', category: 'injection', difficulty: 'basic', question: 'Give 2.5 mg prochlorperazine IV. Have: 5 mg/mL. How many mL?', work: ['2.5 mg × (1 mL / 5 mg)', '= 2.5 mL / 5', '= 0.5 mL'], answer: '0.5' },

    { id: 'bank21', category: 'injection', difficulty: 'intermediate', question: 'Give 6 mg morphine IM. Have: 10 mg/mL. How many mL?', work: ['6 mg × (1 mL / 10 mg)', '= 6 mL / 10', '= 0.6 mL'], answer: '0.6' },
    { id: 'bank22', category: 'injection', difficulty: 'intermediate', question: 'Give 0.4 mg atropine IM. Have: 1 mg/mL. How many mL?', work: ['0.4 mg × (1 mL / 1 mg)', '= 0.4 mL'], answer: '0.4' },
    { id: 'bank23', category: 'injection', difficulty: 'intermediate', question: 'Give 75 mg meperidine IM. Have: 100 mg/mL. How many mL?', work: ['75 mg × (1 mL / 100 mg)', '= 75 mL / 100', '= 0.75 mL'], answer: '0.75' },
    { id: 'bank24', category: 'injection', difficulty: 'intermediate', question: 'Give 12 mg gentamicin IV. Have: 40 mg/mL. How many mL?', work: ['12 mg × (1 mL / 40 mg)', '= 12 mL / 40', '= 0.3 mL'], answer: '0.3' },

    { id: 'bank25', category: 'injection', difficulty: 'complex', question: 'Give 350 units heparin SQ. Have: 1000 units/mL. How many mL?', work: ['350 units × (1 mL / 1000 units)', '= 350 mL / 1000', '= 0.35 mL'], answer: '0.35' },
    { id: 'bank26', category: 'injection', difficulty: 'complex', question: 'Give 500 units insulin SQ. Have: 100 units/mL. How many mL?', work: ['500 units × (1 mL / 100 units)', '= 500 mL / 100', '= 5 mL'], answer: '5' },

    { id: 'bank27', category: 'infusion', difficulty: 'basic', question: 'Infuse 1000 mL over 8 hours via pump. What is the rate in mL/hour?', work: ['1000 mL ÷ 8 hours', '= 125 mL/hour'], answer: '125' },
    { id: 'bank28', category: 'infusion', difficulty: 'basic', question: 'Infuse 500 mL over 2 hours. What is the pump rate?', work: ['500 mL ÷ 2 hours', '= 250 mL/hour'], answer: '250' },
    { id: 'bank29', category: 'infusion', difficulty: 'basic', question: 'Infuse 250 mL D5W over 1 hour. What is the rate?', work: ['250 mL ÷ 1 hour', '= 250 mL/hour'], answer: '250' },
    { id: 'bank30', category: 'infusion', difficulty: 'basic', question: 'Infuse 100 mL over 30 minutes. What rate in mL/hour?', work: ['100 mL ÷ 0.5 hour', '= 200 mL/hour'], answer: '200' },

    { id: 'bank31', category: 'infusion', difficulty: 'intermediate', question: 'Infuse 750 mL over 4 hours. What is the pump rate?', work: ['750 mL ÷ 4 hours', '= 187.5 mL/hour'], answer: '187.5' },
    { id: 'bank32', category: 'infusion', difficulty: 'intermediate', question: 'Infuse 300 mL over 45 minutes. Calculate mL/hour.', work: ['300 mL ÷ (45÷60) hour', '= 300 ÷ 0.75', '= 400 mL/hour'], answer: '400' },
    { id: 'bank33', category: 'infusion', difficulty: 'intermediate', question: 'Infuse 200 mL over 20 minutes. What is the rate?', work: ['200 mL ÷ (20÷60) hour', '= 200 ÷ 0.333', '= 600 mL/hour'], answer: '600' },

    { id: 'bank34', category: 'dripRate', difficulty: 'basic', question: 'Infuse 1000 mL NS over 8 hours, standard set (15 drops/mL). Calculate drops/min.', work: ['(1000 mL × 15 drops/mL) ÷ 480 minutes', '= 15000 drops ÷ 480', '= 31.25 drops/min'], answer: '31.25' },
    { id: 'bank35', category: 'dripRate', difficulty: 'basic', question: 'Infuse 500 mL over 4 hours with 10 drops/mL set. What is drip rate?', work: ['(500 mL × 10 drops/mL) ÷ 240 minutes', '= 5000 drops ÷ 240', '= 20.8 drops/min'], answer: '20.8' },
    { id: 'bank36', category: 'dripRate', difficulty: 'basic', question: 'Infuse 250 mL over 1 hour, microdrip (60 drops/mL). Calculate drops/min.', work: ['(250 mL × 60 drops/mL) ÷ 60 minutes', '= 15000 drops ÷ 60', '= 250 drops/min'], answer: '250' },

    { id: 'bank37', category: 'dripRate', difficulty: 'intermediate', question: 'Infuse 300 mL over 45 minutes with standard 15 drops/mL set. What is drops/min?', work: ['(300 mL × 15 drops/mL) ÷ 45 minutes', '= 4500 drops ÷ 45', '= 100 drops/min'], answer: '100' },
    { id: 'bank38', category: 'dripRate', difficulty: 'intermediate', question: 'Run 1000 mL at 100 mL/hour with 15 drops/mL set. Calculate drip rate.', work: ['(100 mL/hour × 15 drops/mL) ÷ 60 minutes', '= 1500 drops ÷ 60', '= 25 drops/min'], answer: '25' },

    { id: 'bank39', category: 'dripRate', difficulty: 'complex', question: 'Infuse 500 mL over 90 minutes using macrodrip (10 drops/mL). What is drops/min?', work: ['(500 mL × 10 drops/mL) ÷ 90 minutes', '= 5000 drops ÷ 90', '= 55.56 drops/min'], answer: '55.56' },
    { id: 'bank40', category: 'dripRate', difficulty: 'complex', question: 'Run 2000 mL over 12 hours with standard set. Calculate drops/min (15 drops/mL).', work: ['(2000 mL × 15 drops/mL) ÷ 720 minutes', '= 30000 drops ÷ 720', '= 41.67 drops/min'], answer: '41.67' },

    { id: 'bank41', category: 'pediatric', difficulty: 'intermediate', question: 'Child weighs 22 kg. Order: 20 mg/kg/day divided into 4 doses. How much per dose?', work: ['22 kg × 20 mg/kg = 440 mg/day', '440 mg ÷ 4 doses = 110 mg/dose'], answer: '110' },
    { id: 'bank42', category: 'pediatric', difficulty: 'intermediate', question: 'Child weighs 30 lbs. Order: 10 mg/kg once daily. What is the dose?', work: ['30 lb ÷ 2.2 = 13.64 kg', '13.64 kg × 10 mg/kg = 136.4 mg'], answer: '136.4' },
    { id: 'bank43', category: 'pediatric', difficulty: 'intermediate', question: 'Infant weighs 4 kg. Order: 5 mg/kg IV push. Have: 20 mg/mL. How many mL?', work: ['4 kg × 5 mg/kg = 20 mg', '20 mg × (1 mL / 20 mg) = 1 mL'], answer: '1' },

    { id: 'bank44', category: 'pediatric', difficulty: 'complex', question: 'Child 44 lbs needs 25 mg/kg antibiotic IV. Have: 125 mg/5 mL. How many mL?', work: ['44 lb ÷ 2.2 = 20 kg', '20 kg × 25 mg/kg = 500 mg', '500 mg × (5 mL / 125 mg) = 20 mL'], answer: '20' },
    { id: 'bank45', category: 'pediatric', difficulty: 'complex', question: 'Toddler weighs 15 kg. Order: 30 mg/kg/day in 3 doses. Have: 100 mg/5 mL. mL per dose?', work: ['15 kg × 30 mg/kg = 450 mg/day', '450 mg ÷ 3 = 150 mg/dose', '150 mg × (5 mL / 100 mg) = 7.5 mL'], answer: '7.5' }
  ];

  const filteredProblems = selectedDifficulty === 'all' 
    ? problemBank 
    : problemBank.filter(p => p.difficulty === selectedDifficulty);

  const getRandomProblem = () => {
    const randomIdx = Math.floor(Math.random() * filteredProblems.length);
    setRandomProblem(filteredProblems[randomIdx]);
  };

  const WorkDisplay = ({ workSteps, title = "Work shown step-by-step:" }) => (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
      <h4 className="font-semibold text-gray-800 mb-3">{title}</h4>
      <div className="space-y-4">
        {workSteps.map((item, idx) => (
          <div key={idx}>
            {item.step && <p className="text-sm font-semibold text-blue-700 mb-2">{item.step}</p>}
            <div className="bg-white p-3 rounded border border-blue-300 font-mono text-sm text-gray-800 leading-relaxed">
              {item.work.map((line, lineIdx) => (
                <div key={lineIdx}>{line}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProblemCard = ({ problem }) => {
    const isCorrect = isAnswerCorrect(problem.id, problem.answer);
    const userValue = userAnswers[problem.id] || '';

    return (
      <div className="bg-white rounded-lg p-6 mb-6 border border-pink-200 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{problem.question}</h3>
            <div className="mt-2 flex gap-2">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700 capitalize">
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
          {showAnswers[problem.id] ? 'Hide' : 'Show'} work
        </button>

        {showAnswers[problem.id] && (
          <div className="space-y-3">
            <WorkDisplay workSteps={[{ work: problem.work }]} title="Dimensional analysis work:" />
            <div className="bg-pink-50 p-3 rounded border border-pink-200">
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Answer:</span> <span className="text-pink-600 font-mono font-bold">{problem.answer}</span>
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
          <h4 className="font-semibold text-gray-800">Understanding the steps:</h4>
          {problem.steps.map((step) => (
            <div key={step.num} className="border-l-4 border-pink-300 pl-4 py-2">
              <p className="font-semibold text-pink-600">Step {step.num}: {step.title}</p>
              <p className="text-gray-700 text-sm mt-1">{step.content}</p>
            </div>
          ))}
        </div>

        <WorkDisplay workSteps={problem.workSteps} title="How to write it out on paper:" />

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
        <meta name="description" content="Interactive dosage calculation tutoring with step-by-step work shown." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{ backgroundColor: '#faf8f7' }} className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dosage Calculation</h1>
            <p className="text-lg text-gray-600">Dimensional Analysis Method - Work Shown Step-by-Step</p>
            <div className="mt-4 w-12 h-1 bg-gradient-to-r from-pink-400 to-lavender-400 rounded-full"></div>
          </div>

          {/* Introduction Section */}
          <SectionHeader title="Introduction: How Dimensional Analysis Works" section="intro" />
          {expandedSection === 'intro' && (
            <div className="bg-white rounded-lg p-6 mb-8 border border-pink-200 shadow-sm">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">The Basic Principle</h3>
                  <p className="text-gray-700">Dimensional analysis is a problem-solving method where you set up fractions with units. Units that appear in both numerator and denominator cancel out, leaving you with the unit you need.</p>
                </div>
                <div className="bg-lavender-50 p-4 rounded-lg border border-lavender-200">
                  <h4 className="font-semibold text-gray-800 mb-2">Universal Formula</h4>
                  <p className="text-gray-700 text-center font-mono bg-white p-3 rounded border border-lavender-200">
                    Dose Needed × (Available Amount / Available Strength) = Amount to Give
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Why Dimensional Analysis?</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ One method works for all dosage calculations</li>
                    <li>✓ Units cancel visibly—you see errors immediately</li>
                    <li>✓ Easy to check your work on paper</li>
                    <li>✓ Works with any unit conversion</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tutorial Section */}
          <SectionHeader title="Step-by-Step Tutorials: Complex Problems with Full Work" section="tutorials" />
          {expandedSection === 'tutorials' && (
            <div className="space-y-8 mb-8">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-gray-800 text-sm"><span className="font-semibold">How to use:</span> Each problem shows the complete work written out the way you'd write it on paper. Study the work, then try the problem yourself.</p>
              </div>
              {tutorialProblems.map((problem) => (
                <TutorialCard key={problem.id} problem={problem} />
              ))}
            </div>
          )}

          {/* Practice Problem Bank */}
          <SectionHeader title="Practice Problem Bank (45+ Problems with Work Shown)" section="problemBank" />
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
            <h3 className="font-semibold text-gray-800 mb-3">Tips for Success</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>• Write out all work on paper like shown in the tutorials</li>
              <li>• Cross out units as they cancel—this shows your thinking</li>
              <li>• Always include units at every step</li>
              <li>• Check your answer by plugging it back into the problem</li>
              <li>• Start with basic problems, then work up to complex</li>
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
