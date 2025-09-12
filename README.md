# VimTutor Advanced: Because Basic VimTutor is for Wusses Who Can't Handle Real Editing

Listen up, you keyboard-poking amateurs. This repo ain't your grandma's vimtutor—it's an opinionated gut-punch variant cooked up by Ryan Gerard Wilson (ryangerardwilson.com) to teach workflows that actually matter when you're not just doodling "hello world." Lessons 1-6? Straight rip from the original vimtutor 1.5, because basics are basics. But Lesson 7? That's the juice: macros, visual blocks, shifts, auto-indents, and other black magic the stock tutor pretends doesn't exist. If you're still using a mouse in 2025, GTFO and install Vim already.

This setup lets you fuck around in the tutor file without turning it into your personal graffiti wall. Edits? Vaporized on exit. Run it again, fresh hell every time. No more "oops, I broke the sample text" bullshit.

## Requirements
- Python 3.x (because who the hell is still on 2? Fix your shit.)
- Vim (duh. If you don't have it, `sudo apt install vim` or whatever your distro demands. This ain't Notepad territory.)

## Getting Started
1. **Clone this crap:**

    git clone https://github.com/yourusername/vimtutor-advanced.git
    cd vimtutor-advanced

2. **Run the damn thing:**

    python main.py

- It'll bitch if `text.txt` is missing (it shouldn't be—check your clone).
- Fires up Vim on a temp copy of the tutor. Edit like a savage: practice commands, screw up lessons, whatever.
- Quit Vim (`:q` or `ZZ`, you know the drill). Your half-assed changes? Nuked. Original stays pristine.
- No Vim? It'll yell at you to install it, then bail.

3. **Pro Tip:** Virtualenv if you're paranoid (you're probably not). But seriously, just run it—it's idiot-proof.

## What's in the Box?
- `text.txt`: The tutor meat. Lessons 1-6 vanilla, 7+ where it gets fun (word jumps, deletes, macros, blocks, shifts—stuff that makes you productive instead of a vi fossil).
- `main.py`: The launcher. Reads `text.txt`, spawns a temp file for Vim, waits for you to quit, then torches the evidence. Stateful? Hell no—each run's clean.

## Why Bother?
Because stock vimtutor stops at "move around and insert"—this one teaches you to *edit* like a pro without RSI from arrow keys. Ryan's workflows? Battle-tested for code that doesn't segfault on Tuesdays. Experiment, or don't—Vim doesn't care, but your commits will.

## Credits
- Original vimtutor: Bram Moolenaar and Vim crew (bless 'em).
- Opinionated overhaul: Ryan Gerard Wilson (ryangerardwilson.com). If it sucks, blame him. If it's gold, thank me for the README.

## License
MIT, or whatever—fork it, break it, just don't sue me when your fingers cramp.

Questions? Open an issue, but read this first, you lazy sod. Now go practice Lesson 7 before your code turns into tab salad.

