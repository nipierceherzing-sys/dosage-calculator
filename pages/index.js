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
    setUserAnswers({ ...userAnswers, [problemId]: value });
  };

  const toggleAnswerDisplay = (problemId) => {
    setShowAnswers({ ...showAnswers, [problemId]: !showAnswers[problemId] });
  };

  const isAnswerCorrect = (problemId, correct) => {
    const userAnswer = parseFloat(userAnswers[problemId]);
    const correctAnswer = parseFloat(correct);
    if (isNaN(userAnswer)) return null;
    return Math.abs(userAnswer - correctAnswer) < 0.01;
  };

  // Fraction component for displaying stacked fractions
  const Fraction = ({ numerator, denominator }) => (
    <div className="inline-flex flex-col items-center mx-1">
      <div className="text-sm font-mono">{numerator}</div>
      <div className="border-t border-gray-800 w-full"></div>
      <div className="text-sm font-mono">{denominator}</div>
    </div>
  );

  const tutorialProblems = [
    {
      id: 'tut1',
      title: 'Weight-Based Medication: Solumedrol Example',
      question: 'Solumedrol 1.5 mg/kg is ordered for a child weighing 80 lb. Solumedrol is available as 75 mg/2 mL. How many mL must the nurse administer?',
      steps: [
        { num: 1, title: 'Convert weight to kg', content: '80 lb ÷ 2.2 = 36.36 kg (round to 36 kg)' },
        { num: 2, title: 'Calculate total dose needed', content: '36 kg × 1.5 mg/kg = 54 mg' },
        { num: 3, title: 'Convert mg to mL', content: '54 mg × (2 mL / 75 mg) = 1.44 mL' }
      ],
      workHTML: `
        <div class="space-y-6">
          <div class="bg-white p-4 rounded border border-blue-300">
            <p class="text-sm font-semibold text-blue-700 mb-3">Step 1: Convert 80 lb to kg</p>
            <div class="text-center font-mono">
              80 lb ÷ 2.2 lb/kg = 36.36 kg ≈ 36 kg
            </div>
          </div>
          
          <div class="bg-white p-4 rounded border border-blue-300">
            <p class="text-sm font-semibold text-blue-700 mb-3">Step 2: Calculate dose</p>
            <div class="text-center font-mono">
              36 kg × 1.5 mg/kg = 54 mg
            </div>
          </div>

          <div class="bg-white p-4 rounded border border-blue-300">
            <p class="text-sm font-semibold text-blue-700 mb-3">Step 3: Dimensional analysis</p>
            <div class="flex justify-center items-center gap-2 flex-wrap">
              <div>54 mg</div>
              <div>×</div>
              <div style="display: inline-flex; flex-direction: column; align-items: center; margin: 0 4px;">
                <div style="border-bottom: 2px solid #000; padding-bottom: 2px; min-width: 40px; text-align: center;">2 mL</div>
                <div style="padding-top: 2px; text-align: center;">75 mg</div>
              </div>
              <div>=</div>
              <div style="display: inline-flex; flex-direction: column; align-items: center; margin: 0 4px;">
                <div style="border-bottom: 2px solid #000; padding-bottom: 2px; min-width: 50px; text-align: center;">108 mL</div>
                <div style="padding-top: 2px; text-align: center;">75</div>
              </div>
              <div>= 1.44 mL</div>
            </div>
            <p class="text-xs text-gray-600 mt-3 italic">Note: mg cancels out, leaving mL</p>
          </div>
        </div>
      `,
      answer: '1.44'
    },
    {
      id: 'tut2',
      title: 'Simple Dosage: Oral Medication',
      question: 'Order: 500 mg penicillin. Have: 250 mg/5 mL. How many mL?',
      steps: [
        { num: 1, title: 'Identify dose needed', content: '500 mg' },
        { num: 2, title: 'Identify what you have', content: '250 mg in 5 mL' },
        { num: 3, title: 'Set up dimensional analysis', content: 'Dose needed × (mL available / mg available)' }
      ],
      workHTML: `
        <div class="bg-white p-4 rounded border border-blue-300">
          <p class="text-sm font-semibold text-blue-700 mb-3">Dimensional Analysis</p>
          <div class="flex justify-center items-center gap-2 flex-wrap">
            <div>500 mg</div>
            <div>×</div>
            <div style="display: inline-flex; flex-direction: column; align-items: center; margin: 0 4px;">
              <div style="border-bottom: 2px solid #000; padding-bottom: 2px; min-width: 40px; text-align: center;">5 mL</div>
              <div style="padding-top: 2px; text-align: center;">250 mg</div>
            </div>
            <div>=</div>
            <div style="display: inline-flex; flex-direction: column; align-items: center; margin: 0 4px;">
              <div style="border-bottom: 2px solid #000; padding-bottom: 2px; min-width: 50px; text-align: center;">2500 mL</div>
              <div style="padding-top: 2px; text-align: center;">250</div>
            </div>
            <div>= 10 mL</div>
          </div>
          <p class="text-xs text-gray-600 mt-3 italic">mg cancels, leaving mL</p>
        </div>
      `,
      answer: '10'
    },
    {
      id: 'tut3',
      title: 'Unit Conversion: mcg to mL',
      question: 'Order: 250 mcg digoxin IM. Have: 500 mcg/2 mL. How many mL?',
      steps: [
        { num: 1, title: 'Units match', content: 'Both are mcg, so no conversion needed' },
        { num: 2, title: 'Set up the fraction', content: 'Dose needed × (mL / mcg available)' }
      ],
      workHTML: `
        <div class="bg-white p-4 rounded border border-blue-300">
          <p class="text-sm font-semibold text-blue-700 mb-3">Dimensional Analysis</p>
          <div class="flex justify-center items-center gap-2 flex-wrap">
            <div>250 mcg</div>
            <div>×</div>
            <div style="display: inline-flex; flex-direction: column; align-items: center; margin: 0 4px;">
              <div style="border-bottom: 2px solid #000; padding-bottom: 2px; min-width: 40px; text-align: center;">2 mL</div>
              <div style="padding-top: 2px; text-align: center;">500 mcg</div>
            </div>
            <div>=</div>
            <div style="display: inline-flex; flex-direction: column; align-items: center; margin: 0 4px;">
              <div style="border-bottom: 2px solid #000; padding-bottom: 2px; min-width: 40px; text-align: center;">500 mL</div>
              <div style="padding-top: 2px; text-align: center;">500</div>
            </div>
            <div>= 1 mL</div>
          </div>
          <p class="text-xs text-gray-600 mt-3 italic">mcg cancels, leaving mL</p>
        </div>
      `,
      answer: '1'
    }
  ];

  const problemBank = [
    { id: 'bank1', category: 'oral', difficulty: 'basic', question: 'Give 500 mg penicillin. Have: 250 mg/5 mL. How many mL?', work: '500 mg × (5 mL / 250 mg) = 10 mL', answer: '10' },
    { id: 'bank2', category: 'oral', difficulty: 'basic', question: 'Give 300 mg amoxicillin. Have: 125 mg/5 mL. How many mL?', work: '300 mg × (5 mL / 125 mg) = 12 mL', answer: '12' },
    { id: 'bank3', category: 'oral', difficulty: 'basic', question: 'Give 750 mg acetaminophen. Have: 500 mg/5 mL. How many mL?', work: '750 mg × (5 mL / 500 mg) = 7.5 mL', answer: '7.5' },
    { id: 'bank4', category: 'oral', difficulty: 'basic', question: 'Give 200 mg ibuprofen. Have: 100 mg/5 mL. How many mL?', work: '200 mg × (5 mL / 100 mg) = 10 mL', answer: '10' },
    { id: 'bank5', category: 'oral', difficulty: 'basic', question: 'Give 1 gram cephalexin. Have: 250 mg tablets. How many tablets?', work: '1000 mg × (1 tablet / 250 mg) = 4 tablets', answer: '4' },
    { id: 'bank6', category: 'oral', difficulty: 'basic', question: 'Give 400 mg metformin. Have: 500 mg tablets. How many tablets?', work: '400 mg × (1 tablet / 500 mg) = 0.8 tablets', answer: '0.8' },
    { id: 'bank7', category: 'oral', difficulty: 'basic', question: 'Give 100 mg aspirin. Have: 500 mg/5 mL. How many mL?', work: '100 mg × (5 mL / 500 mg) = 1 mL', answer: '1' },
    { id: 'bank8', category: 'oral', difficulty: 'basic', question: 'Give 150 mg fluconazole. Have: 50 mg/5 mL. How many mL?', work: '150 mg × (5 mL / 50 mg) = 15 mL', answer: '15' },
    { id: 'bank9', category: 'oral', difficulty: 'intermediate', question: 'Give 350 mg metronidazole. Have: 125 mg/5 mL. How many mL?', work: '350 mg × (5 mL / 125 mg) = 14 mL', answer: '14' },
    { id: 'bank10', category: 'oral', difficulty: 'intermediate', question: 'Give 200 mcg digoxin. Have: 0.05 mg/mL. How many mL?', work: '200 mcg ÷ 1000 = 0.2 mg; 0.2 mg × (1 mL / 0.05 mg) = 4 mL', answer: '4' },
    { id: 'bank11', category: 'oral', difficulty: 'intermediate', question: 'Give 400 mg ciprofloxacin. Have: 100 mg tablets. How many tablets?', work: '400 mg × (1 tablet / 100 mg) = 4 tablets', answer: '4' },
    { id: 'bank12', category: 'oral', difficulty: 'intermediate', question: 'Give 600 mg ibuprofen. Have: 200 mg/5 mL. How many mL?', work: '600 mg × (5 mL / 200 mg) = 15 mL', answer: '15' },
    { id: 'bank13', category: 'oral', difficulty: 'intermediate', question: 'Give 2 grams amoxicillin. Have: 500 mg tablets. How many tablets?', work: '2000 mg × (1 tablet / 500 mg) = 4 tablets', answer: '4' },
    { id: 'bank14', category: 'oral', difficulty: 'complex', question: 'Give 450 mg azithromycin. Have: 200 mg/5 mL. How many mL?', work: '450 mg × (5 mL / 200 mg) = 11.25 mL', answer: '11.25' },
    { id: 'bank15', category: 'oral', difficulty: 'complex', question: 'Give 0.5 mg digoxin. Have: 0.125 mg tablets. How many tablets?', work: '0.5 mg × (1 tablet / 0.125 mg) = 4 tablets', answer: '4' },

    { id: 'bank16', category: 'injection', difficulty: 'basic', question: 'Give 10 mg morphine IM. Have: 15 mg/mL. How many mL?', work: '10 mg × (1 mL / 15 mg) = 0.67 mL', answer: '0.67' },
    { id: 'bank17', category: 'injection', difficulty: 'basic', question: 'Give 5 mg diazepam IV. Have: 5 mg/mL. How many mL?', work: '5 mg × (1 mL / 5 mg) = 1 mL', answer: '1' },
    { id: 'bank18', category: 'injection', difficulty: 'basic', question: 'Give 8 mg atropine SQ. Have: 0.4 mg/mL. How many mL?', work: '8 mg × (1 mL / 0.4 mg) = 20 mL', answer: '20' },
    { id: 'bank19', category: 'injection', difficulty: 'basic', question: 'Give 4 mg haloperidol IM. Have: 5 mg/mL. How many mL?', work: '4 mg × (1 mL / 5 mg) = 0.8 mL', answer: '0.8' },
    { id: 'bank20', category: 'injection', difficulty: 'basic', question: 'Give 2.5 mg prochlorperazine IV. Have: 5 mg/mL. How many mL?', work: '2.5 mg × (1 mL / 5 mg) = 0.5 mL', answer: '0.5' },

    { id: 'bank21', category: 'injection', difficulty: 'intermediate', question: 'Give 6 mg morphine IM. Have: 10 mg/mL. How many mL?', work: '6 mg × (1 mL / 10 mg) = 0.6 mL', answer: '0.6' },
    { id: 'bank22', category: 'injection', difficulty: 'intermediate', question: 'Give 0.4 mg atropine IM. Have: 1 mg/mL. How many mL?', work: '0.4 mg × (1 mL / 1 mg) = 0.4 mL', answer: '0.4' },
    { id: 'bank23', category: 'injection', difficulty: 'intermediate', question: 'Give 75 mg meperidine IM. Have: 100 mg/mL. How many mL?', work: '75 mg × (1 mL / 100 mg) = 0.75 mL', answer: '0.75' },
    { id: 'bank24', category: 'injection', difficulty: 'intermediate', question: 'Give 12 mg gentamicin IV. Have: 40 mg/mL. How many mL?', work: '12 mg × (1 mL / 40 mg) = 0.3 mL', answer: '0.3' },

    { id: 'bank25', category: 'injection', difficulty: 'complex', question: 'Give 350 units heparin SQ. Have: 1000 units/mL. How many mL?', work: '350 units × (1 mL / 1000 units) = 0.35 mL', answer: '0.35' },
    { id: 'bank26', category: 'injection', difficulty: 'complex', question: 'Give 500 units insulin SQ. Have: 100 units/mL. How many mL?', work: '500 units × (1 mL / 100 units) = 5 mL', answer: '5' },

    { id: 'bank27', category: 'infusion', difficulty: 'basic', question: 'Infuse 1000 mL over 8 hours. What is mL/hour?', work: '1000 mL ÷ 8 hours = 125 mL/hour', answer: '125' },
    { id: 'bank28', category: 'infusion', difficulty: 'basic', question: 'Infuse 500 mL over 2 hours. What is the pump rate?', work: '500 mL ÷ 2 hours = 250 mL/hour', answer: '250' },
    { id: 'bank29', category: 'infusion', difficulty: 'basic', question: 'Infuse 250 mL over 1 hour. What is the rate?', work: '250 mL ÷ 1 hour = 250 mL/hour', answer: '250' },
    { id: 'bank30', category: 'infusion', difficulty: 'basic', question: 'Infuse 100 mL over 30 minutes. What rate in mL/hour?', work: '100 mL ÷ 0.5 hour = 200 mL/hour', answer: '200' },

    { id: 'bank31', category: 'infusion', difficulty: 'intermediate', question: 'Infuse 750 mL over 4 hours. What is the pump rate?', work: '750 mL ÷ 4 hours = 187.5 mL/hour', answer: '187.5' },
    { id: 'bank32', category: 'infusion', difficulty: 'intermediate', question: 'Infuse 300 mL over 45 minutes. Calculate mL/hour.', work: '300 mL ÷ 0.75 hour = 400 mL/hour', answer: '400' },
    { id: 'bank33', category: 'infusion', difficulty: 'intermediate', question: 'Infuse 200 mL over 20 minutes. What is the rate?', work: '200 mL ÷ 0.333 hour = 600 mL/hour', answer: '600' },

    { id: 'bank34', category: 'dripRate', difficulty: 'basic', question: 'Infuse 1000 mL over 8 hours, standard set (15 drops/mL). Calculate drops/min.', work: '(1000 × 15) ÷ 480 = 31.25 drops/min', answer: '31.25' },
    { id: 'bank35', category: 'dripRate', difficulty: 'basic', question: 'Infuse 500 mL over 4 hours (10 drops/mL). What is drip rate?', work: '(500 × 10) ÷ 240 = 20.8 drops/min', answer: '20.8' },
    { id: 'bank36', category: 'dripRate', difficulty: 'basic', question: 'Infuse 250 mL over 1 hour, microdrip (60 drops/mL). Calculate drops/min.', work: '(250 × 60) ÷ 60 = 250 drops/min', answer: '250' },

    { id: 'bank37', category: 'dripRate', difficulty: 'intermediate', question: 'Infuse 300 mL over 45 minutes (15 drops/mL). What is drops/min?', work: '(300 × 15) ÷ 45 = 100 drops/min', answer: '100' },
    { id: 'bank38', category: 'dripRate', difficulty: 'intermediate', question: 'Run 1000 mL at 100 mL/hour (15 drops/mL). Calculate drip rate.', work: '(100 × 15) ÷ 60 = 25 drops/min', answer: '25' },

    { id: 'bank39', category: 'dripRate', difficulty: 'complex', question: 'Infuse 500 mL over 90 min using macrodrip (10 drops/mL). What is drops/min?', work: '(500 × 10) ÷ 90 = 55.56 drops/min', answer: '55.56' },
    { id: 'bank40', category: 'dripRate', difficulty: 'complex', question: 'Run 2000 mL over 12 hours (15 drops/mL). Calculate drops/min.', work: '(2000 × 15) ÷ 720 = 41.67 drops/min', answer: '41.67' },

    { id: 'bank41', category: 'pediatric', difficulty: 'intermediate', question: 'Child 22 kg. Order: 20 mg/kg/day in 4 doses. How much per dose?', work: '22 kg × 20 mg/kg = 440 mg/day; 440 ÷ 4 = 110 mg/dose', answer: '110' },
    { id: 'bank42', category: 'pediatric', difficulty: 'intermediate', question: 'Child 30 lbs. Order: 10 mg/kg once daily. What is the dose?', work: '30 lb ÷ 2.2 = 13.64 kg; 13.64 × 10 = 136.4 mg', answer: '136.4' },
    { id: 'bank43', category: 'pediatric', difficulty: 'intermediate', question: 'Infant 4 kg. Order: 5 mg/kg IV push. Have: 20 mg/mL. How many mL?', work: '4 kg × 5 mg/kg = 20 mg; 20 mg × (1 mL / 20 mg) = 1 mL', answer: '1' },

    { id: 'bank44', category: 'pediatric', difficulty: 'complex', question: 'Child 44 lbs needs 25 mg/kg antibiotic. Have: 125 mg/5 mL. How many mL?', work: '44 ÷ 2.2 = 20 kg; 20 × 25 = 500 mg; 500 × (5/125) = 20 mL', answer: '20' },
    { id: 'bank45', category: 'pediatric', difficulty: 'complex', question: 'Toddler 15 kg. Order: 30 mg/kg/day in 3 doses. Have: 100 mg/5 mL. mL per dose?', work: '15 × 30 = 450 mg/day; 450 ÷ 3 = 150 mg; 150 × (5/100) = 7.5 mL', answer: '7.5' }
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
        <h3 className="font-semibold text-gray-800 mb-3">{problem.question}</h3>
        <div className="mb-4 flex gap-2">
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
                {isCorrect ? <Check className="w-5 h-5 text-green-600" /> : <X className="w-5 h-5 text-red-600" />}
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
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <p className="text-sm font-mono text-gray-800 mb-3">{problem.work}</p>
            <p className="text-sm text-gray-800">
              <span className="font-semibold">Answer:</span> <span className="text-pink-600 font-mono font-bold">{problem.answer}</span>
            </p>
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
          <h4 className="font-semibold text-gray-800">Steps:</h4>
          {problem.steps.map((step) => (
            <div key={step.num} className="border-l-4 border-pink-300 pl-4 py-2">
              <p className="font-semibold text-pink-600">Step {step.num}: {step.title}</p>
              <p className="text-gray-700 text-sm mt-1">{step.content}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
          <h4 className="font-semibold text-gray-800 mb-4">Work Shown (like on paper):</h4>
          <div dangerouslySetInnerHTML={{ __html: problem.workHTML }} />
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
                {isCorrect ? <Check className="w-5 h-5 text-green-600" /> : <X className="w-5 h-5 text-red-600" />}
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
        <meta name="description" content="Dosage calculation with work shown visually." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{ backgroundColor: '#faf8f7' }} className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dosage Calculation</h1>
            <p className="text-lg text-gray-600">Dimensional Analysis - Fractions Shown Visually</p>
            <div className="mt-4 w-12 h-1 bg-gradient-to-r from-pink-400 to-lavender-400 rounded-full"></div>
          </div>

          <SectionHeader title="Introduction" section="intro" />
          {expandedSection === 'intro' && (
            <div className="bg-white rounded-lg p-6 mb-8 border border-pink-200 shadow-sm">
              <p className="text-gray-700 mb-4">Dimensional analysis uses fractions and unit cancellations to solve dosage problems. Set up the problem so units cancel out, leaving only the unit you need.</p>
            </div>
          )}

          <SectionHeader title="Tutorials: Examples with Fractions" section="tutorials" />
          {expandedSection === 'tutorials' && (
            <div className="space-y-8 mb-8">
              {tutorialProblems.map((problem) => (
                <TutorialCard key={problem.id} problem={problem} />
              ))}
            </div>
          )}

          <SectionHeader title="Practice Problems (45+)" section="problemBank" />
          {expandedSection === 'problemBank' && (
            <div>
              <div className="bg-white rounded-lg p-4 mb-6 border border-pink-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Filter:</label>
                <div className="flex gap-2 flex-wrap mb-4">
                  {['all', 'basic', 'intermediate', 'complex'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`px-3 py-2 rounded-lg font-medium text-sm ${
                        selectedDifficulty === diff
                          ? 'bg-pink-400 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </button>
                  ))}
                </div>
                <button
                  onClick={getRandomProblem}
                  className="px-4 py-2 bg-lavender-300 text-purple-800 rounded-lg font-semibold"
                >
                  <Shuffle className="w-4 h-4 inline mr-2" />
                  Random Problem
                </button>
              </div>

              {randomProblem && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Random Problem:</h3>
                  <ProblemCard problem={randomProblem} />
                </div>
              )}

              <h3 className="text-lg font-semibold text-gray-800 mb-4">All Problems:</h3>
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

          <div className="mt-12 p-6 bg-gradient-to-r from-pink-50 to-lavender-50 rounded-lg border border-pink-200">
            <h3 className="font-semibold text-gray-800 mb-3">Tips for Success</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>• Write fractions vertically like shown in tutorials</li>
              <li>• Cross out units as they cancel</li>
              <li>• Always include units at every step</li>
              <li>• Check answer by substituting back into problem</li>
            </ul>
          </div>
        </div>

        <style jsx>{`
          .lavender-50 { background-color: #f3e8fa; }
          .lavender-300 { background-color: #dbb9ff; }
        `}</style>
      </div>
    </>
  );
}
