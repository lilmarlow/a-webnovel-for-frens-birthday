const dialogueTree = {
    start: {
        sprite: 'assets/shocked.png',
        text: "Wait, who clicked 'Start'? I wasn't ready! My dialogue tree hasn't even loaded yet, and I'm pretty sure I'm missing my idle animation!",
        choices: [
            { text: "Whoops, my bad. Are you the main character?", next: 'branchA' },
            { text: "You look like a low-res JPEG.", next: 'branchB' }
        ]
    },
    branchA: {
        sprite: 'assets/idle.png',
        text: "Me? A main character? Look at my line-art! I'm clearly a side-NPC. The dev calls me a 'smart AI,' but I’m basically just a bunch of 'if-statements' holding a calico cat's personality for dear life.",
        next: 'secondQuestion'
    },
    branchB: {
        sprite: 'assets/idle.png',
        text: "Hey! Don't blame me for the resolution! My dev is currently suffering from a massive Art Block. He literally stared at a white canvas for three hours before drawing me and calling it 'stylized.' He's a silly weirdo who develops 10 games just to archive them all!",
        next: 'secondQuestion'
    },
    secondQuestion: {
        sprite: 'assets/idle.png',
        text: "Anyway, since you're already poking around in the source code...",
        choices: [
            { text: "Did the dev give you a script at least?", next: 'branchC' },
            { text: "Is there any loot around here?", next: 'branchD' }
        ]
    },
    branchC: {
        sprite: 'assets/happy.png',
        text: "Ouh yeah, I know all your secrets! Like how you love Starscream, and those times you cosplayed Teto and Agnes? Yeah! I wish I had eyes to look at you there! I bet you looked way more high-res than I do!",
        next: 'discovery'
    },
    branchD: {
        sprite: 'assets/idle.png',
        text: "Loot? You want loot? I’m a line of code living in a folder named 'Final_FINAL_version_2'. If I was actually smart, I’d have coded myself some better shoes or at least a background that isn't just... gestures at the void... this!",
        next: 'discovery'
    },
    discovery: {
        sprite: 'assets/shocked.png',
        text: "Wait... you were told to log in today? Let me check the system calendar... !!",
        next: 'transition'
    },
    transition: {
        sprite: 'assets/shocked.png',
        text: "Oh. Oh no. OH NO. The creator is gonna delete my source code. I had ONE job to do today! Forget the dialogue tree! We're skipping straight to the secret ending!",
        action: 'slide-down',
        next: 'ending'
    },
    ending: {
        sprite: 'assets/happy.png',
        text: "Yknow what... HAPPY BIRTHDAYY!!!\n\nHAPPY BIRTHDAYY GIRLLL!! HOPE YOU HAVE A GOOD ONE!!! NOW PLEASE PRETEND THIS WAS A VERY DEEP AND EMOTIONAL GAME SO I DON'T GET REPLACED BY A REAL AI!!",
        action: 'shake-vibrate',
        next: null
    }
};

let currentNode = 'start';

// DOM Elements
const loginContainer = document.getElementById('login-container');
const loginButton = document.getElementById('login-button');
const gameContainer = document.getElementById('game-container');
const characterSprite = document.getElementById('character-sprite');
const dialogueText = document.getElementById('dialogue-text');
const choicesContainer = document.getElementById('choices-container');
const nextButton = document.getElementById('next-button');
const audioContainer = document.getElementById('audio-container');

// Event Listeners
loginButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    const node = dialogueTree[currentNode];
    if (node && node.next) {
        currentNode = node.next;
        renderNode();
    }
});

function startGame() {
    // Hide login, show game
    loginContainer.classList.add('hidden');
    gameContainer.classList.remove('hidden');

    // Play hidden YouTube audio (autoplay requires interaction)
    audioContainer.innerHTML = '<iframe width="0" height="0" src="https://www.youtube.com/embed/Tp-QXW1cvlk?autoplay=1&loop=1&playlist=Tp-QXW1cvlk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';

    renderNode();
}

function renderNode() {
    const node = dialogueTree[currentNode];
    if (!node) return;

    // Update Sprite
    characterSprite.src = node.sprite;

    // Handle Actions/Animations
    if (node.action === 'slide-down') {
        characterSprite.classList.add('slide-down');
    } else if (node.action === 'shake-vibrate') {
        document.body.classList.add('shake');
        characterSprite.classList.add('vibrate');
    }

    // Update Text
    dialogueText.innerText = node.text;

    // Clear choices & next button
    choicesContainer.innerHTML = '';
    nextButton.classList.add('hidden');

    // Render Choices or Next button
    if (node.choices) {
        node.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-button';
            btn.innerText = choice.text;
            btn.onclick = () => {
                currentNode = choice.next;
                renderNode();
            };
            choicesContainer.appendChild(btn);
        });
    } else if (node.next) {
        nextButton.classList.remove('hidden');
    }
}
