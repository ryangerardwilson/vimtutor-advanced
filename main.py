#!/usr/bin/env python3

import tempfile
import subprocess
import os

script_dir = os.path.dirname(os.path.realpath(__file__))
text_path = os.path.join(script_dir, 'text.txt')
if not os.path.exists(text_path):
    print(f"No text.txt in {script_dir}? What the hell are you running this on, fresh air? Fix your shit.")
with open(text_path, 'r', encoding='utf-8') as f:
    original_content = f.read()

def main():

    # Spit it into a temp file so your monkeying around doesn't trash the source.
    # Yeah, it's deleted when Vim quits, but we keep it fresh each run.
    with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', encoding='utf-8', delete=False) as tmp:
        tmp.write(original_content)
        temp_file = tmp.name

    print(f"Opening {temp_file} in Vim. Edit like a savage, but it won't stick—next run's clean. Ctrl-Z if you hate yourself.")

    # Fire up Vim, you masochist. Wait for it to croak.
    try:
        subprocess.call(['vim', temp_file])
    except FileNotFoundError:
        print("Vim not found? Install the damn thing, this ain't Notepad.")
        os.unlink(temp_file)  # Clean up the corpse.
        return 1
    finally:
        # Nuke the temp file, because who needs your half-assed changes?
        try:
            os.unlink(temp_file)
        except OSError:
            pass  # Whatever, it's gone.

    print("Vim died. Your edits? Vaporized. Run again for a fresh hell.")
    return 0

if __name__ == '__main__':
    exit(main())
