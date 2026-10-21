import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from shared.http import run
from runtime import CrewRuntime

if __name__ == '__main__':
    run(CrewRuntime(ROOT), ROOT)
