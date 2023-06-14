/*---------------------------
<script src="../../github/musicNotationCanvas/musicNotationCanvas.js"></script>
<!-- 
<script src="https://www.guitarland.com/javascripts/musicNotationCanvas.js"></script>
-->

<script>
//---------------------------------------*/

//-----------------------------------------------------
// From Music10SampleQuestions.html script
//-----------------------------------------------------
let theTimeSig = '6/8';
let theNotes = ['B3','G4'];
let theNotes2 = ['A3','E4'];
let allNotes = [];
let theFontLetters = [];
let theFontLetters2 = [];
let randomQuestion = 0;
let nextIndex = 0;
//let currentClef = 'treble';
let currentClef = 'bass';

const rhythmTextToFontLetters = {
	"1n" : 'w', 
	"d2n" : 'h.', "2n." : 'h.', "2n" : 'h', "2t" : 'h',
	"d4n" : 'q.', "4n." : 'q.', "4n" : 'q', "4t" :  'q',
	"d8n" : 'e.', "8n." : 'e.', "8n" : 'e', "8t" : 'e',
	"d16n" : 'x.', "16n." : 'x.', "16n" : 'x', "16t" : 'x',

	"1r" : 'wr', 
	"d2r" : 'h.r', "2r." : 'h.r', "2r" : 'hr', "2tr" : 'hr',
	"d4r" : 'q.r', "4r." : 'q.r', "4r" : 'q', "4tr" :  'q',
	"d8r" : 'e.r', "8r." : 'e.r', "8r" : 'er', "8tr" : 'er',
	"d16r" : 'x.r', "16r." : 'x.r', "16r" : 'xr', "16tr" : 'xr'
};

const t01Notes = [['D4'],['E4'],['F4'],['G4'],['A4'],['B4'],['C5'],['D5'],['E5'],['F5']];
const t02Notes = [['E3'],['F3'],['G3'],['A3'],['B3'],['A5'],['B5'],['C6'],['D6'],['E6']];
const t03Notes = [['Db4'],['Eb4'],['F#4'],['G#4'],['Ab4'],['Bb4'],['C#5'],['Db5'],['Eb5'],['F#5']];
const t04Notes = [['C4','D4','E4','F4','G4','A4','Bb4','C5'],
    ['D4','E4','F#4','G4','A4','B4','C#5','D5'],
    ['Eb4','F4','G4','A4','Bb4','C5','D5','Eb5'],
    ['E4','F#4','G4','A4','B4','C#5','D#5','E5'],
    ['F4','G4','A4','Bb4','C5','D5','E5','F5'],
    ['G4','A4','B4','C5','D5','E5','F#5','G5'],
    ['A4','B4','C5','D5','E5','F#5','G#5','A5'],
    ['Bb4','C5','D5','Eb5','F5','G5','Ab5','Bb5']];
    
const t05Notes = [['6/8','8n'],['3/4','2n'],['4/4','4n'],['2/2','4n'],
    ['3/8','8n'],['2/4','2n'],['4/4','2n'],['3/4','d4n'],
    ['6/8','8n'],['6/8','4n'],['6/8','d8n'],['3/4','d2n'],['4/4','d4n']];

const t06Notes = [['6/8','8n','4n','2n'],['4/4','8n','4n','2n'],['6/8','8n','4n','d4n'],
    ['4/4','4n','4n','2n']];

const t07Notes = [['C'], ['Db'], ['D'], ['Eb'], ['E'], ['F'], ['F#'], ['G'], ['Ab'], ['A'], ['Bb'], ['B'] ];
const t08Notes = [['C4','D4','Eb4','F4','G4','Ab4','Bb4','C5'],['D4','E4','F4','G4','A4','Bb4','C#5','D5'],
    ['E4','F#4','G4','A4','B4','C5','D5','E5'],['F#4','G#4','A4','B4','C#5','D5','E#5','F#5'],
    ['G4','A4','Bb4','C5','D5','E5','F#5','G5'],['A4','B4','C5','D5','Eb5','F#5','G5','A5'],
    ['Bb3','C4','Db4','Eb4','F4','Gb4','Ab4','Bb4'],['B3','C#4','D4','E4','F#4','G4','A4','B4'],
    ['F4','G4','Ab4','Bb4','C5','Db5','E5','F5'],['C#4','D#4','E4','F#4','G#4','A#4','B#4','C#5']];
const t09Notes = [['C'], ['C#'], ['D'], ['Eb'], ['E'], ['F'], ['F#'], ['G'], ['G#'], ['A'], ['Bb'], ['B'] ];
const t10Notes = [['B3','G4','6th'],['C4','F4','4th'],['D4','A4','5th'],['E4','F4','2nd'],['F4','A4','3rd'],
    ['G4','G5','octave'],['A4','E4','4th'],['E5','G4','6th'],['C4','B4','7th'],['D4','F4','3rd']];

const t11Notes = [['Bb3','G4','Maj6'],['C4','F#4','Aug4'],['Db4','Ab4','P5'],['E4','F#4','Maj2'],
    ['F#4','A4','Min3'],['G#4','F5','Dim7'],['A4','E4','P4'],['E5','G#4','Min6'],['C4','B4','Maj7'],['D4','F4','Min3']];

const t12aNotes = [['C4','E4','G4','Major'],['D4','F#4','A4','Major'],['E4','G4','Bb4','Diminished'],
    ['F4','Ab4','C5','Minor'],['G4','B4','D#5','Augmented'],['A4','C5','E5','Minor'],
    ['Bb4','D5','F#5','Augmented'],['C#4','E4','G4','Diminished'],['Eb4','G4','Bb4','Major'],['F#4','A4','C#5','Minor']];

const t12bNotes = [['C4','E4','G4','Root position'],['F#4','A4','D5','1st inversion'],['G4','Bb4','E5','1st inversion'],
    ['C4','F4','Ab4','2nd inversion'],['G4','B4','D#5','Root position'],['E4','A4','C5','2nd inversion'],
    ['D4','F4','Bb4','1st inversion'],['C#4','E4','G#4','Root position'],
    ['G4','Bb4','Eb5','1st inversion'],['C#4','F#4','A4','2nd inversion']];

const t13Notes = [['C4','D4','E4','F4','G4','A4','Bb4','C5','Mixolydian'],
    ['D4','E4','F#4','G#4','A4','B4','C#5','D5','Lydian'],
    ['Eb4','F4','Gb4','Ab4','Bb4','C5','Db5','Eb5','Dorian'],
    ['E4','F#4','G4','A4','B4','C5','D5','E5','Aeolian'],
    ['F4','Gb4','Ab4','Bb4','C5','Db5','Eb5','F5','Phrygian'],
    ['G#4','A4','B4','C#5','D5','E5','F#5','G#5','Locrian'],
    ['A4','B4','C5','D5','E5','F#5','G5','A5','Dorian'],
    ['Bb4','C5','D5','Eb5','F5','G5','Ab5','Bb5','Mixolydian']];

//---------------------------------------------------------------------
const t01NotesBass = [['F2'],['G2'],['A2'],['B2'],['C3'],['D3'],['E3'],['F3'],['G3'],['A3']];
const t02NotesBass = [['A1'],['B1'],['C2'],['D2'],['C4'],['D4'],['E4'],['F4'],['G4'],['A4']];
const t03NotesBass = [['F#2'],['G#2'],['Ab2'],['Bb2'],['C#3'],['Db3'],['Eb3'],['F#3'],['G#3'],['Ab3']];

const t04NotesBass = [['C3','D3','E3','F3','G3','A3','Bb3','C4'],
    ['D3','E3','F#3','G3','A3','B3','C#4','D4'],
    ['Eb2','F2','G2','A2','Bb2','C3','D3','Eb3'],
    ['E2','F#2','G2','A2','B2','C#3','D#3','E3'],
    ['F2','G2','A2','Bb2','C3','D3','E3','F3'],
    ['G2','A2','B2','C3','D3','E3','F#3','G3'],
    ['A2','B2','C3','D3','E3','F#3','G#3','A3'],
    ['Bb2','C3','D3','Eb3','F3','G3','Ab3','Bb3']];
    
const t05NotesBass = [['6/8','8n'],['3/4','2n'],['4/4','4n'],['2/2','4n'],
    ['3/8','8n'],['2/4','2n'],['4/4','2n'],['3/4','d4n'],
    ['6/8','d4n'],['6/8','4n'],['6/8','d8n'],['3/4','d2n'],['4/4','d4n']];

const t06NotesBass = [['6/8','8n','4n','2n'],['4/4','8n','4n','2n'],['6/8','8n','4n','d4n'],
    ['4/4','4n','4n','2n'],['4/4','8n','8n','d2n'],['5/4','4n','4n','d2n'],['3/4','8n','d4n','4n']];

const t07NotesBass = [['C'], ['Db'], ['D'], ['Eb'], ['E'], ['F'], ['F#'], ['G'], ['Ab'], ['A'], ['Bb'], ['B'] ];

const t08NotesBass = [['C3','D3','Eb3','F3','G3','Ab3','Bb3','C4'],['D3','E3','F3','G3','A3','Bb3','C#4','D4'],
    ['E2','F#2','G2','A2','B2','C3','D3','E3'],['F#2','G#2','A2','B2','C#3','D3','E#3','F#3'],
    ['G2','A2','Bb2','C3','D3','E3','F#3','G3'],['A2','B2','C3','D3','Eb3','F#3','G3','A3'],
    ['Bb2','C3','Db3','Eb3','F3','Gb3','Ab3','Bb3'],['B2','C#3','D3','E3','F#3','G3','A3','B3'],
    ['F2','G2','Ab2','Bb2','C3','Db3','E3','F3'],['C#2','D#2','E2','F#2','G#2','A#2','B#2','C#3']];

const t09NotesBass = [['C'], ['C#'], ['D'], ['Eb'], ['E'], ['F'], ['F#'], ['G'], ['G#'], ['A'], ['Bb'], ['B'] ];

const t10NotesBass = [['B2','G3','6th'],['C3','F3','4th'],['D3','A3','5th'],['E3','F3','2nd'],['F3','A3','3rd'],
    ['G2','G3','octave'],['A3','E3','4th'],['E3','G2','6th'],['C3','B3','7th'],['D3','F3','3rd']];

const t11NotesBass = [['Bb2','G3','Maj6'],['C3','F#3','Aug4'],['Db3','Ab3','P5'],['E3','F#3','Maj2'],
    ['F#3','A3','Min3'],['G#2','F3','Dim7'],['A3','E3','P4'],['E3','G#2','Min6'],['C3','B3','Maj7'],['D3','F3','Min3']];

const t12aNotesBass = [['C3','E3','G3','Major'],['D3','F#3','A3','Major'],['E3','G3','Bb3','Diminished'],
    ['F3','Ab3','C4','Minor'],['G2','B2','D#3','Augmented'],['A2','C3','E3','Minor'],
    ['Bb2','D3','F#3','Augmented'],['C#3','E3','G3','Diminished'],['Eb3','G3','Bb3','Major'],['F#3','A3','C#4','Minor']];

const t12bNotesBass = [['C3','E3','G3','Root position'],['F#2','A2','D3','1st inversion'],['G2','Bb2','E3','1st inversion'],
    ['C3','F3','Ab3','2nd inversion'],['G2','B2','D#3','Root position'],['E3','A3','C4','2nd inversion'],
    ['D3','F3','Bb3','1st inversion'],['C#3','E3','G#3','Root position'],
    ['G2','Bb2','Eb3','1st inversion'],['C#3','F#3','A3','2nd inversion']];

const t13NotesBass = [['C3','D3','E3','F3','G3','A3','Bb3','C4','Mixolydian'],
    ['D3','E3','F#3','G#3','A3','B3','C#4','D4','Lydian'],
    ['Eb3','F3','Gb3','Ab3','Bb3','C4','Db4','Eb4','Dorian'],
    ['E3','F#3','G3','A3','B3','C4','D4','E4','Aeolian'],
    ['F2','Gb2','Ab2','Bb2','C3','Db3','Eb3','F3','Phrygian'],
    ['G#2','A2','B2','C#3','D3','E3','F#3','G#3','Locrian'],
    ['A2','B2','C3','D3','E3','F#3','G3','A3','Dorian'],
    ['Bb2','C3','D3','Eb3','F3','G3','Ab3','Bb3','Mixolydian']];

//---------------------------------------------------------------------

const allNotesTreble = [t01Notes, t02Notes, t03Notes, t04Notes, t05Notes, 
    t06Notes, t07Notes, t08Notes, t09Notes, t10Notes, t11Notes, t12aNotes, t12bNotes, t13Notes];

const allNotesBass = [t01NotesBass, t02NotesBass, t03NotesBass, t04NotesBass, t05NotesBass, 
    t06NotesBass, t07NotesBass, t08NotesBass, t09NotesBass, t10NotesBass, t11NotesBass, 
    t12aNotesBass, t12bNotesBass, t13NotesBass];


const buttonT01Choices = ['A','B','C','D','E','F','G'];
const buttonT02Choices = ['A','B','C','D','E','F','G'];
const buttonT03Choices = ['Ab','Bb','C#','Db','Eb','F#','G#'];
const buttonT04Choices = ['Spelled correctly','The 2nd note is wrong','The 3rd note is wrong','The 4th note is wrong','The 5th note is wrong','The 6th note is wrong','The 7th note is wrong'];
const buttonT05Choices = ['1/4 of a count','1/2 of a count','1 count','1 1/2 counts','2 counts','3 counts','4 counts'];
const buttonT06Choices = ['The measure is correct','Too many counts in the shown measure','Not enough counts in the shown measure'];
const buttonT07Choices = ['Ab major','A major','Bb major','B major','C major','Db major','D major','Eb major','E major','F major','F# major','Gb major','G major'];
const buttonT08Choices = ['natural minor','harmonic minor','melodic minor','none of the three minor forms'];
const buttonT09Choices = ['A minor','Bb minor','B minor','C minor','C# minor','D minor','D# minor','Eb minor','E minor','F minor','F# minor','G minor','G# minor'];
const buttonT10Choices = ['unison','2nd','3rd','4th','5th','6th','7th','octave'];
const buttonT11Choices = ['P1','Min2','Maj2','Min3','Maj3','P4','Aug4','Dim5','P5','Min6','Maj6','Dim7','Min7','Maj7','P8'];
const buttonT12aChoices = ['Major', 'Minor', 'Diminished', 'Augmented'];
const buttonT12bChoices = ['Root position', '1st inversion', '2nd inversion'];
const buttonT13Choices = ['Ionian','Dorian','Phrygian','Lydian','Mixolydian','Aeolian','Locrian'];

const allButtonsChoices = [buttonT01Choices, buttonT02Choices, buttonT03Choices, buttonT04Choices, 
    buttonT05Choices, buttonT06Choices, buttonT07Choices, buttonT08Choices, buttonT09Choices, 
    buttonT10Choices, buttonT11Choices, buttonT12aChoices, buttonT12bChoices, buttonT13Choices];

function makeRadioButtons(arrayOfChoices, id) {
    let html = ''
    let numOfChars = 0
    arrayOfChoices.forEach(choice => {
        numOfChars += choice.length + 3;
        html += "<input type='radio' id='"+choice+"' name='"+id+"' value='"+choice+"'><label for='"+choice+"'>"+choice+"</label> | "; 
        if(numOfChars > 50) {
            html += '<br>';
            numOfChars = 0;
        }
    });
    return html;
}


var keySigs = {
	"C": "KSTs0.GIF",
	"C# (7#)\nDb (5b)": "KSTf5.GIF",
	"D (2#)": "KSTs2.GIF",
	"Eb (3b)": "KSTf3.GIF",
	"E (4#)": "KSTs4.GIF",
	"F (1b)": "KSTf1.GIF",
	"F# (6#)\nGb (6b)": "KSTf6.GIF",
	"G (1#)": "KSTs1.GIF",
	"Ab (4b)": "KSTf4.GIF",
	"A (3#)": "KSTs3.GIF",
	"Bb (2b)": "KSTf2.GIF",
	"B (5#)\nCb (7b)": "KSTs5.GIF"
}

const durationToQuarterNoteCounts = {
    '16n': 0.25, '8n': 0.5, '4n': 1, '2n': 2, '1n': 4,
    'd16n': 0.375, 'd8n': 0.75, 'd4n': 1.5, 'd2n': 3, '1n': 4
}

const countsToText = {
    0.25: '1/4', 0.5: '1/2', 1: '1', 2: '2', 3: '3', 4: '4',
    0.375: '3/8', 0.75: '3/4', 1.5: '1 1/2', 2.5: '2 1/2'    
}
  
const keyNoteToMajorScale = {
    'Ab': ['Ab','Bb','C','Db','Eb','F','G','Ab'],
    'A': ['A','B','C#','D','E','F#','G#','A'],
    'Bb': ['Bb','C','D','Eb','F','G','A','Bb'],
    'B': ['B','C#','D#','E','F#','G#','A#','B'],
    'C': ['C','D','E','F','G','A','B','C'],
    'C#': ['C#','D#','E#','F#','G#','A#','B#','C#'],
    'Cb': ['Cb','Db','Eb','Fb','Gb','Ab','Bb','Cb'],
    'D': ['D','E','F#','G','A','B','C#','D'],
    'Db': ['Db','Eb','F','Gb','Ab','Bb','C','Db'],
    'Eb': ['Eb','F','G','Ab','Bb','C','D','Eb'],
    'E': ['E','F#','G#','A','B','C#','D#','E'],
    'F': ['F','G','A','Bb','C','D','E','F'],
    'F#': ['F#','G#','A#','B','C#','D#','E#','F#'],
    'Gb': ['Gb','Ab','Bb','Cb','Db','Eb','F','Gb'],
    'G': ['G','A','B','C','D','E','F#','G']    
}


const keyNoteToNaturalMinor = {
    'Ab': ['Ab','Bb','Cb','Db','Eb','Fb','Gb','Ab'],
    'A': ['A','B','C','D','E','F','G','A'],
    'A#': ['A#','B#','C#','D#','E#','F#','G#','A#'],
    'Bb': ['Bb','C','Db','Eb','F','Gb','Ab','Bb'],
    'B': ['B','C#','D','E','F#','G','A','B'],
    'C': ['C','D','Eb','F','G','Ab','Bb','C'],
    'C#': ['C#','D#','E','F#','G#','A','B','C#'],
    'D': ['D','E','F','G','A','Bb','C','D'],
    'D#': ['D#','E#','F#','G#','A#','B','C#','D#'],
    'Eb': ['Eb','F','Gb','Ab','Bb','Cb','Db','Eb'],
    'E': ['E','F#','G','A','B','C','D','E'],
    'F': ['F','G','Ab','Bb','C','Db','Eb','F'],
    'F#': ['F#','G#','A','B','C#','D','E','F#'],
    'G': ['G','A','Bb','C','D','Eb','F','G'], 
    'G#': ['G#','A#','B','C#','D#','E','F#','G#']
}

const keyNoteToHarmonicMinor = {
    'Ab': ['Ab','Bb','Cb','Db','Eb','Fb','G','Ab'],
    'A': ['A','B','C','D','E','F','G#','A'],
    'A#': ['A#','B#','C#','D#','E#','F#','Gx','A#'],
    'Bb': ['Bb','C','Db','Eb','F','Gb','A','Bb'],
    'B': ['B','C#','D','E','F#','G','A#','B'],
    'C': ['C','D','Eb','F','G','Ab','B','C'],
    'C#': ['C#','D#','E','F#','G#','A','B#','C#'],
    'D': ['D','E','F','G','A','Bb','C#','D'],
    'D#': ['D#','E#','F#','G#','A#','B','Cx','D#'],
    'Eb': ['Eb','F','Gb','Ab','Bb','Cb','D','Eb'],
    'E': ['E','F#','G','A','B','C','D#','E'],
    'F': ['F','G','Ab','Bb','C','Db','E','F'],
    'F#': ['F#','G#','A','B','C#','D','E#','F#'],
    'G': ['G','A','Bb','C','D','Eb','F#','G'], 
    'G#': ['G#','A#','B','C#','D#','E','Fx','G#']
}

const keyNoteToMelodicMinor = {
    'Ab': ['Ab','Bb','Cb','Db','Eb','F','G','Ab'],
    'A': ['A','B','C','D','E','F#','G#','A'],
    'A#': ['A#','B#','C#','D#','E#','Fx','Gx','A#'],
    'Bb': ['Bb','C','Db','Eb','F','G','A','Bb'],
    'B': ['B','C#','D','E','F#','G#','A#','B'],
    'C': ['C','D','Eb','F','G','A','B','C'],
    'C#': ['C#','D#','E','F#','G#','A#','B#','C#'],
    'D': ['D','E','F','G','A','B','C#','D'],
    'D#': ['D#','E#','F#','G#','A#','B#','Cx','D#'],
    'Eb': ['Eb','F','Gb','Ab','Bb','C','D','Eb'],
    'E': ['E','F#','G','A','B','C#','D#','E'],
    'F': ['F','G','Ab','Bb','C','D','E','F'],
    'F#': ['F#','G#','A','B','C#','D#','E#','F#'],
    'G': ['G','A','Bb','C','D','E','F#','G'], 
    'G#': ['G#','A#','B','C#','D#','E#','Fx','G#']
}


let theChords = [['D4','F4','A4'],['B3','D4','G4'],['C4','E4','G4']];
let theDurations = ['4n','4n'];
let theDurations2 = ['1n','1n'];

theDurations.forEach(translator);
theDurations2.forEach(translator2);

function translator(element, index) {
    theFontLetters[index] = rhythmTextToFontLetters[element];
}
function translator2(element, index) {
    theFontLetters2[index] = rhythmTextToFontLetters[element];
}

// This function isn't used in the game, it loads two questions 
// and assumes there is a canvas element named 'myCanvas2'
// It was orignally used with a review page for Music 10 students.
// FOR GAME PURPOSES use updateQuestions2() below.
/*-----------------------------------------------------------------
function updateQuestions() {
    document.querySelector('#display1').innerHTML = '';
    document.querySelector('#display2').innerHTML = '';
    let questionTitles = ['Note Identification','Note Identification','Note Identification',
        'Major Scales','Notes Values in Time Signatures','Using Time Signatures to count Notes Values',
        'Major Key Signatures','Minor Scales','Minor Key Signatures','Interval Numbers',
        'Interval Names','Triad quality','Triad inversions','Modes of the major scale']
    let questions = ['What is the name of the displayed note?',
        'What is the name of the displayed note?',
        'What is the name of the displayed note?',
        'The displayed notes are either a correctly spelled major scale or there is one mistake.  Choose the appropriate answer.',
        'Consider the following time signature, how many counts does the note receive?', 
        'Consider this time signature and the total count of the shown notes.  Select the appropriate answer', 
        'What major key is represented by this key signature?',
        'The scale displayed is either one of the three forms of minor (natural, harmonic, melodic) or it is none of those forms.  Choose the appropriate answer.',
        'What minor key is represented by this key signature?',
        'What interval number of the two notes displayed?',
        'What interval name of the two notes displayed?',
        'Displayed are triads in arpeggiated form.  Analyze the interval structure to determine the type: major, minor, diminished or augmented.',
        'Displayed are triads in arpeggiated form.  Determine if they are in root position, 1st inversion or 2nd inversion.',
        'Identify the mode name of the displayed notes.'];

    let titleAreas = document.querySelectorAll('.questionTitle');
//    console.log('titleArea='+titleArea);
    let textAreas = document.querySelectorAll('.questionText');
    let buttonsAreas = document.querySelectorAll('.answerButtons');

    // this is USER input from a menu, to use this code in a game context set
    // testSelection via other means.
    let testSelection = document.querySelector('#testSelector').value;

    // set allNotes
    let clefChoice = getRandomInt(2);
//    console.log(` clefChoice= ${clefChoice} currentClef=${currentClef} `);
    if(clefChoice == 1) {
        allNotes = allNotesBass;
        currentClef = 'bass';
    } else {
        allNotes = allNotesTreble;
        currentClef = 'treble';        
    }
    
    // get index from menu choices
    let testNotes = allNotes[testSelection];
    let len = testNotes.length;
    let lastNum = -1;
    let lastNum2 = -1;
    randomQuestion = getRandomInt(len);
    // to prevent repeats
    while( (randomQuestion === lastNum) || (randomQuestion === lastNum) ){
        randomQuestion = getRandomInt(len);
    }
    lastNum2 = lastNum;
    lastNum = randomQuestion;
    
    let newNotes = testNotes[randomQuestion];
    nextIndex = getNextRandomIndex(len, randomQuestion);
    let newNotes2 = testNotes[nextIndex];

    titleAreas.forEach(title => {
        title.innerHTML = questionTitles[testSelection];
    });
    textAreas.forEach(t => {
        t.innerHTML = questions[testSelection];
    });
    buttonsAreas.forEach((b, index) => {
        let buttonId = ''+testSelection+'_'+index;
        b.innerHTML = makeRadioButtons(allButtonsChoices[testSelection], buttonId);
    });
    
//    console.log(`newNotes=${newNotes} newNotes2=${newNotes2}`);
    // question 1
    if(testSelection == 6) {
        DrawTheKeySignature(newNotes[0], 'myCanvas', currentClef);
        DrawTheKeySignature(newNotes2[0], 'myCanvas2', currentClef);        
    } else if(testSelection == 4 || testSelection == 5) {
        DrawRhythms(newNotes, 'myCanvas');
        DrawRhythms(newNotes2, 'myCanvas2');
        if(testSelection == 5) {
            music.drawBarline(100);
            music.drawBarline(350);
            music2.drawBarline(100);
            music2.drawBarline(350);
        }

    } else if(testSelection == 8) {
        DrawTheMinorKeySignature(newNotes[0], 'myCanvas', currentClef);
        DrawTheMinorKeySignature(newNotes2[0], 'myCanvas2', currentClef);        
    

    } else if(testSelection > 8 ) {
        DrawMusic(newNotes.slice(0,-1), 'myCanvas', currentClef);
        DrawMusic(newNotes2.slice(0,-1), 'myCanvas2', currentClef);        
    } else {
        DrawMusic(newNotes, 'myCanvas', currentClef);
        DrawMusic(newNotes2, 'myCanvas2', currentClef);
    }    
}
//-----------------------------------------------------------------*/


// FOR GAME PURPOSES -------------------------------------------
// loads a single question into the page, 
// assumes page has a canvas with the id of 'myCanvas'
let lastNum = -1;
let lastNum2 = -1;
let randomStart = 0; 
function updateQuestions2() {
//    console.log('start updateQuestions2() --------------');
//    isCorrect = true;
    let reload = document.querySelector('#reload').innerHTML = '';
    document.querySelector('#display1').innerHTML = '';
    let questionDiv = document.getElementById('questionDiv');
    questionDiv.style.display='inline';  
    let evalButton = document.querySelector('#evalButton');
    evalButton.style.display = 'inline';
    let answerButtons = document.querySelector('.answerButtons');
    answerButtons.style.display = 'inline';
    document.querySelector('.instructions').style.display='none';

    let questionTitles = ['Note Identification','Note Identification','Note Identification',
        'Major Scales','Notes Values in Time Signatures','Using Time Signatures to count Notes Values',
        'Major Key Signatures','Minor Scales','Minor Key Signatures','Interval Numbers',
        'Interval Names','Triad quality','Triad inversions','Modes of the major scale']
    let questions = ['What is the name of the displayed note?',
        'What is the name of the displayed note?',
        'What is the name of the displayed note?',
        'The displayed notes are either a correctly spelled major scale or there is one mistake.  Choose the appropriate answer.',
        'Consider the following time signature, how many counts does the note receive?', 
        'Consider this time signature and the total count of the shown notes.  Select the appropriate answer', 
        'What major key is represented by this key signature?',
        'The scale displayed is either one of the three forms of minor (natural, harmonic, melodic) or it is none of those forms.  Choose the appropriate answer.',
        'What minor key is represented by this key signature?',
        'What interval number of the two notes displayed?',
        'What interval name of the two notes displayed?',
        'Displayed are triads in arpeggiated form.  Analyze the interval structure to determine the type: major, minor, diminished or augmented.',
        'Displayed are triads in arpeggiated form.  Determine if they are in root position, 1st inversion or 2nd inversion.',
        'Identify the mode name of the displayed notes.'];

    let titleAreas = document.querySelectorAll('.questionTitle');
    let textAreas = document.querySelectorAll('.questionText');
    let buttonsAreas = document.querySelectorAll('.answerButtons');
//    console.log('textAreas='+textAreas);

    let testSelection = document.querySelector('#testSelector').value;
//    console.log('testSelection='+testSelection+' typeof(testSelection)='+typeof(testSelection));
    // set allNotes
    let clefChoice = getRandomInt(2);
//    console.log(` clefChoice= ${clefChoice} currentClef=${currentClef} `);
    if(clefChoice == 1) {
        allNotes = allNotesBass;
        currentClef = 'bass';
    } else {
        allNotes = allNotesTreble;
        currentClef = 'treble';        
    }
    
    // get index from menu choices
    let testNotes = allNotes[testSelection];
    let len = testNotes.length;
    randomStart++;
    randomQuestion = (randomStart % len);    

//    randomQuestion = getRandomInt(len);
    // to prevent repeats
    while( (randomQuestion === lastNum) || (randomQuestion === lastNum2) ){
        randomQuestion = getRandomInt(len);
    }
    lastNum2 = lastNum;
    lastNum = randomQuestion;
    
    let newNotes = testNotes[randomQuestion];

    titleAreas.forEach(title => {
        title.innerHTML = questionTitles[testSelection];
    });
    textAreas.forEach(t => {
        t.innerHTML = questions[testSelection];
    });
    buttonsAreas.forEach((b, index) => {
        let buttonId = ''+testSelection+'_'+index;
        b.innerHTML = makeRadioButtons(allButtonsChoices[testSelection], buttonId);
    });
    
//    console.log(`newNotes=${newNotes} newNotes2=${newNotes2}`);
    // question 1
    if(testSelection == 6) {
        DrawTheKeySignature(newNotes[0], 'myCanvas', currentClef);
    } else if(testSelection == 4 || testSelection == 5) {
        DrawRhythms(newNotes, 'myCanvas');
        if(testSelection == 5) {
            music.drawBarline(100);
            music.drawBarline(350);
        }

    } else if(testSelection == 8) {
        DrawTheMinorKeySignature(newNotes[0], 'myCanvas', currentClef);    
    } else if(testSelection > 8 ) {
        DrawMusic(newNotes.slice(0,-1), 'myCanvas', currentClef);
    } else {
        DrawMusic(newNotes, 'myCanvas', currentClef);
    }    
}


function getNextRandomIndex(limit, oldIndex) {
    var index = getRandomInt(limit);
    while(index === oldIndex) {
        index = getRandomInt(limit);
    }
    return index;
}


function DrawMusic(notes, pageID, clef) {
    let myMusic = getCanvas(pageID);
//    console.log('start DrawMusic()--------myMusic='+myMusic);
    myMusic.clearCanvas();
    let staffSize = 100 + (notes.length * 50);
    myMusic.drawTheStaff(staffSize);
//    console.log('clef='+clef);
    let position = 0;
    const myClef = clef? clef: 'treble';
    if(myClef =='bass') {
        position = 16;
    } else if (myClef == 'treble') {
        position = 8;
    }
    myMusic.drawClef(myClef, position);
    theFontLetters = [];
    theDurations.forEach(translator);
//    console.log('theFontLetters='+theFontLetters+' notes='+notes);
    myMusic.drawScale(notes, theFontLetters);
}


function DrawTheKeySignature(key, pageID, clef) {
    let myMusic = getCanvas(pageID);
    myMusic.clearCanvas();
    myMusic.drawTheStaff(250);
    const myClef = clef? clef: 'treble';
    if(myClef =='bass') {
        position = 16;
    } else if (myClef == 'treble') {
        position = 8;
    }
    myMusic.drawClef(myClef, position);
    myMusic.drawKeySignature(key);
}

const minorToRelativeMajor = {
    'Ab': 'Cb', 'A': 'C', 'Bb': 'Db', 'B': 'D',
    'C': 'Eb', 'C#': 'E', 'D': 'F', 'D#': 'F#',
    'E': 'G', 'F': 'Ab', 'F#': 'A', 'G': 'Bb', 'G#': 'B'
}

function DrawTheMinorKeySignature(key, pageID, clef) {
    let myMusic = getCanvas(pageID);
    myMusic.clearCanvas();
    myMusic.drawTheStaff(250);
    const myClef = clef? clef: 'treble';
    if(myClef =='bass') {
        position = 16;
    } else if (myClef == 'treble') {
        position = 8;
    }
    myMusic.drawClef(myClef, position);
    let relativeMajor = minorToRelativeMajor[key];
    myMusic.drawKeySignature(relativeMajor);
}


function DrawRhythms(rhythms, pageID, clef) {
//    console.log('rhythms='+rhythms)
    let myMusic = getCanvas(pageID);
    myMusic.clearCanvas();
    myMusic.setClef('treble');
    myMusic.drawTimeSignature(rhythms[0]);
    let durations = rhythms.slice(1);
    theFontLetters = [];
    durations.forEach(translator);
    let notes = [];
    theFontLetters.forEach(el => {
        notes.push('G4');
    });
//    console.log('notes='+notes);
    myMusic.drawScale(notes, theFontLetters, 'treble');
}

function getCanvas(id) {
    if(id === 'myCanvas') {
        return music;
    } else if(id === 'myCanvas2') {
        return music2;    
    } else {
        return music;    
    }
}


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var studentAnswer1 = '';
var studentAnswer2 = '';
var form = document.querySelector("#myForm");
form.addEventListener("submit", getSubmission, false);

function getSubmission(event) {
    // testSelection needs to be set via other means for game use.
    // trying to use a hidden field to mimic the menu
    let testIndex = document.querySelector('#testSelector').value;
    let key1 = ''+testIndex+'_0';
    let key2 = ''+testIndex+'_1';
    
	var data = new FormData(form);
//    console.log('data='+data);
	var output = "";
	var entryCount = 0;
	for (const entry of data) {
	  entryCount += 1;
	  if(entry[0] == key1) {
		  studentAnswer1 = entry[1].slice();
//		  console.log('studentAnswer1='+studentAnswer1)
	  } else if(entry[0] == key2) {
		  studentAnswer2 = entry[1].slice();
//		  console.log('studentAnswer2='+studentAnswer2)
	  }        
	  output = output + entry[0] + " = " + entry[1] + "\n";
	};
//	console.log(output);
	event.preventDefault();
}

function evaluateAnswers() {
    window.setTimeout(evaluate, 500);
}

let isCorrect = false;
function evaluate() {
//    console.log('start evaluate()-----------------');
    let msg = ''
    let testSelection = document.querySelector('#testSelector').value;
    let testNotes = allNotes[testSelection];
    let newNotes = testNotes[randomQuestion];
    isCorrect = false;
//    console.log('newNotes='+newNotes+' newNotes2='+newNotes2);
    if(testSelection < 3) {
        var correctAnswer1 = removeNumbers(newNotes);
    } else if(testSelection == 3) {
        var correctAnswer1 = getCorrectAnswer_T04(newNotes);
    } else if(testSelection == 4) {
        var correctAnswer1 = getCorrectAnswer_T05(newNotes);
    } else if(testSelection == 5) {
        var correctAnswer1 = getCorrectAnswer_T06(newNotes);
    } else if(testSelection == 6) {
        var correctAnswer1 = newNotes + ' major';
    } else if(testSelection == 7) {
        var correctAnswer1 = getCorrectAnswer_T08(newNotes);
    } else if(testSelection == 8) {
        var correctAnswer1 = newNotes + ' minor';
    } else if(testSelection > 8 ) {
        var correctAnswer1 = getCorrectAnswer_T10_13(newNotes);
    }

	if(correctAnswer1 == studentAnswer1) {
        let hitNewGoal = Game.playGoal();
		msg = '&nbsp;&nbsp;<span class="correctAnswer">Your answer &quot;'+studentAnswer1+'&quot;';
        msg += ' is correct. <b>You can use the arrow keys to move the butterfly!</b></span>';
        if(hitNewGoal){
            msg += ' <br /><br /><span class="correctAnswer"><b>Congratulations on reaching a new goal!';
            msg += ' ' + GameWorld.count + ' correct.</b></span>';
        }
    } else {
		msg = '&nbsp;&nbsp;<span class="incorrectAnswer">Your answer &quot;'+studentAnswer1+'&quot;';
        msg += ' is incorrect, the correct answer is <b>'+correctAnswer1+'</b>.';
        msg += ' Click the reload button to try again.</span>';        
	}
	document.querySelector('#display1').innerHTML = msg;
//    console.log('Answer='+msg);

    isCorrect = (correctAnswer1 == studentAnswer1);
    if(!isCorrect){
        const reloadButton = "<input type='button' id='reloadButton' name='reloadButton' value='Reload Question'>";
        let reload = document.querySelector('#reload');
        reload.innerHTML = reloadButton;
        reload.onclick = updateQuestions2;
        let evalButton = document.querySelector('#evalButton');
        evalButton.style.display = 'none';
        let answerButtons = document.querySelector('.answerButtons');
        answerButtons.style.display = 'none';

	    isFrozen = true; // defined in index.js
    } else {
        let reload = document.querySelector('#reload');
        reload.innerHTML = '';
	    isFrozen = false; // defined in index.js
    }
//    console.log('isCorrect='+isCorrect+' isFrozen='+isFrozen);
}

const numberToPositionalText = {
    1: '1st', 2: '2nd', 3: '3rd', 4: '4th', 5: '5th', 6: '6th', 7: '7th'
}

function getCorrectAnswer_T04(array) {
    let keyNote = stripOffNumber(array[0]);
    let correctScale = keyNoteToMajorScale[keyNote];
    let len = correctScale.length;
    let displayScale = removeNumbers(array);
    let i = 0;
    let correctAnswer = '';
    for(i=0; i<len; i++) {
        if(correctScale[i] != displayScale[i]) {
            break;
        }
    }
    if(i > 7) {
        correctAnswer = buttonT04Choices[0]
    } else {
        correctAnswer = buttonT04Choices[i];        
    }
    return correctAnswer;
}

function getCorrectAnswer_T05(array) {
    let bottomNum = Number.parseInt(array[0].split('/')[1]);
    let counts = durationToQuarterNoteCounts[array[1]];
    let scaleFactor = Math.fround(bottomNum/4);
    counts = Math.fround(counts * scaleFactor);
//    console.log('scaleFactor='+scaleFactor+' bottomNum='+bottomNum+' counts='+counts);
    if(counts < 1) {
        var words = ' of a count';
    } else if(counts == 1) {
        var words = ' count';    
    } else if(counts > 1) {
        var words = ' counts';    
    }
    let answer = countsToText[counts] + words;
    return answer;
}

function getCorrectAnswer_T06(array) {
    let topNum = Number.parseInt(array[0].split('/')[0]);
    let bottomNum = Number.parseInt(array[0].split('/')[1]);
    let counts = durationToQuarterNoteCounts[array[1]];
    let scaleFactor = Math.fround(4/bottomNum);
    let correctTotalCount = Math.fround(topNum * scaleFactor);
    let durations = array.slice(1);
    let totalDisplayedCounts = 0;
    let correctAnswer = '';
    durations.forEach(dur => {
        totalDisplayedCounts += durationToQuarterNoteCounts[dur]    
    });
    if(totalDisplayedCounts == correctTotalCount) {
        correctAnswer = buttonT06Choices[0];
    } else if(totalDisplayedCounts > correctTotalCount) {
        correctAnswer = buttonT06Choices[1];
    } else if(totalDisplayedCounts < correctTotalCount) {
        correctAnswer = buttonT06Choices[2];
    }
    return correctAnswer;
}

function getCorrectAnswer_T08(array) {
//    console.log(array);
    let keyNote = stripOffNumber(array[0]);
    let correctNaturalMinor = keyNoteToNaturalMinor[keyNote];
    let correctHarmonicMinor = keyNoteToHarmonicMinor[keyNote];
    let correctMelodicMinor = keyNoteToMelodicMinor[keyNote];
    let len = correctNaturalMinor.length;
    let displayScale = removeNumbers(array);
    let i = 0;
    let correctAnswer = '';
    // look for natural minor
    for(i=0; i<len; i++) {
        if(correctNaturalMinor[i] != displayScale[i]) {
            break;
        }
    }
//    console.log('search for natural minor i='+i);
    if(i == 8) {
        return buttonT08Choices[0];
    }
    
    // look for harmonic minor
    for(i=0; i<len; i++) {
        if(correctHarmonicMinor[i] != displayScale[i]) {
            break;
        }
    }
//    console.log('search for harmonic minor i='+i);
    if(i == 8) {
        return buttonT08Choices[1];
    }

    // look for melodic minor
    for(i=0; i<len; i++) {
        if(correctMelodicMinor[i] != displayScale[i]) {
            break;
        }
    }
//    console.log('search for melodic minor i='+i);
    if(i == 8) {
        return buttonT08Choices[2];
    }
    
    return buttonT08Choices[3];
}


function getCorrectAnswer_T10_13(array) {
    let answer = array[array.length - 1];
    console.log('array='+array+' answer='+answer);
    return answer;
}

function removeNumbers(array) {
    var newArray = [];
    array.forEach(el => {
        newArray.push(stripOffNumber(el));
    });
    return newArray;
}

function stripOffNumber(note) {
    var theNote = note.slice();
    return theNote.slice(0,theNote.length-1);
}


var theNumOfPickupNotes = 0;
var music = MusicNotation();

//music.drawTheStaff(300);
//music.drawClef('treble');
//music.setNoteSpacing(30);
//music.drawScale(theNotes, theFontLetters);

const evalButton = document.querySelector('#evaluateButton');
evalButton.onclick = evaluateAnswers;


//------------------------------------------------------------
//------------- Tone.js stuff --------------------------------
//------------------------------------------------------------
function stopIt(){
    Tone.Transport.stop();
    Tone.Transport.cancel(0);
    clearTimeout(timeOutRef);
}

function updateTempo()  {
    let tempo = 80;
//    var tempo = document.myForm.tempo.value;
    Tone.Transport.bpm.value = tempo;   
}

function updateVolume()  {
    synth1.volume.value = -10;
//    synth1.volume.value = document.myForm.volume.value;
}

function updateMute()  {
//    let muteSoundBoolean = document.myForm.muteSound.checked;
    const muteSoundBoolean = document.querySelector("#muteSound").checked;
	melodyLine.mute = muteSoundBoolean ? true: false;
}

function lilyTranslator(goalNum) {
    let lilynotes = '';
    let len = goalMusic.length;
    if(goalNum > len || goalNum < 0) return;
    lilynotes = goalMusic[goalNum];
    var results = lpAdapter.translateLilyToToneJS(lilynotes);
//        console.log('results[0]='+results[0]+' results[1]='+results[1]);
    return results;
}

let synth1;
let melodyLine;
function playIt(goalNum) {
    let notesAndRhythm = lilyTranslator(goalNum);
    let myMelody = Rhythm.mergeDurationsAndPitch(notesAndRhythm[1], notesAndRhythm[0]);
    synth1 = new Tone.Synth().toMaster();
    melodyLine = new Tone.Part(function(time, value){
        synth1.triggerAttackRelease(value.note, value.duration, time);
//			console.log('value.note='+value.note+' value.duration='+value.duration+' time='+time);			
        }, myMelody ).start();
    synth1.volume.value = -10;
    let tempo = 80;
    Tone.Transport.bpm.value = tempo;   
//    Tone.Transport.setLoopPoints(0, "12m");
//    Tone.Transport.loopStart = '0';
//    Tone.Transport.loopEnd = '12m';
//    Tone.Transport.loop = false;
/*--------------------------------------------------------
    if(document.getElementById('swing').checked) {
        Tone.Transport.swing = 0.3;
    } else {
        Tone.Transport.swing = 0;
    }
//------------------------------------------------------*/
    updateMute();
    updateVolume();
    updateTempo();
    Tone.Transport.start('+0.1');    

    var myLoopBoolean = false;
//    autoStop(myLoopBoolean);
}

var timeOutRef;
function autoStop(myLoopBoolean) {
    let stopTime = Rhythm.getTotalTime(); // in measure format
    let stopTimeMs = Tone.Time(stopTime).toMilliseconds ( );
    //	console.log('stopTimeMs='+stopTimeMs);
    if(!myLoopBoolean) {
        timeOutRef = window.setTimeout(stopIt, (stopTimeMs+1000));
    }
}


const goal1 = "\\relative c' { r16 c16 d e f d e c g'8 c b32 a b16. c8 d16 g, a b c a b g d'8 g f32 e f16. g8 }";
const goal2 = "\\relative c'' { e16 a g f e g f a g f e d c e d f e d c b a c b d c b a g fis a g b a8 }";
const goal3 = "\\relative c' { r16 e16 a c b e, b' d c8 e gis, e' a,16 e a c b e, b' d c8 a }";
const goal4 = "\\relative c'' { e16 d c e d c b d c a' gis b a e f d gis, f' e d c32 d c16. b16 a a4 }";
const goal5 = "\\relative c'' { g16 b d b g d' b g g' d fis a fis d a' fis d c' b a g fis g a d, g fis g fis e d c b a b c b a g fis g a d, g fis g d b g b d g4 }";
const goal6 = "\\relative c' { c32 cis d dis e f fis g gis a ais b c cis d dis e f fis g gis a ais b c b bes a aes g ges f e ees d des c b bes a aes g ges f e ees d des c4 }";

const goalMusic = [goal1, goal2, goal3, goal4, goal5, goal6];
