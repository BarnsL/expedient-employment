"""Assemble installable Crew apps into a fresh, private output directory."""
import argparse
import hashlib
import json
import shutil
from pathlib import Path

HERE = Path(__file__).resolve().parent
SOURCE = HERE.parent

def package(output, only_cli):
    output = Path(output).resolve()
    if output.exists():
        raise ValueError('Choose a fresh output directory; existing packages are preserved')
    required = ['app.json', 'backend/server.py', 'ui/index.mjs', 'ui/icon.svg', 'README.md']
    names = ['expedient-employment']
    only_cli = Path(only_cli).resolve()
    if not (only_cli / 'node_modules/@only-cli/oc/src/cli.js').is_file():
        raise ValueError('Provide the existing verified only-cli runtime directory')
    for name in names:
        for relative in required + [f'skills/{name}/SKILL.md']:
            if not (HERE / name / relative).is_file():
                raise ValueError(f'Missing package asset: {name}/{relative}')
    output.mkdir(parents=True)
    ignore = shutil.ignore_patterns('__pycache__', '*.pyc', '.cli-key', 'data', 'tests', '.app_secret')
    manifests = {}
    for name in names:
        target = output / name
        shutil.copytree(HERE / name, target, ignore=ignore)
        shutil.copytree(HERE / 'shared', target / 'shared', ignore=ignore)
        if name == 'expedient-employment':
            shutil.copytree(SOURCE / 'job_pipeline', target / 'job_pipeline', ignore=ignore)
            (target / 'config').mkdir()
            for filename in ('profile.json', 'searches.json', 'access_policy.json', 'agent_web_browser.json', 'job_schema.json', 'application_profile.example.json'):
                shutil.copy2(SOURCE / 'config' / filename, target / 'config' / filename)
            shutil.copy2(SOURCE / 'LICENSE', target / 'LICENSE')
            shutil.copytree(only_cli / 'node_modules', target / 'only-cli-runtime/node_modules',
                            ignore=shutil.ignore_patterns('.cache', '*.log'))
            for filename in ('package.json', 'package-lock.json'):
                if (only_cli / filename).is_file():
                    shutil.copy2(only_cli / filename, target / 'only-cli-runtime' / filename)
        hashes = {str(file.relative_to(target)).replace('\\', '/'): hashlib.sha256(file.read_bytes()).hexdigest()
                  for file in target.rglob('*') if file.is_file()}
        manifests[name] = hashes
    (output / 'package-hashes.json').write_text(json.dumps(manifests, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({'output': str(output), 'packages': {name: len(files) for name, files in manifests.items()}}))

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', required=True)
    parser.add_argument('--only-cli-source', required=True)
    args = parser.parse_args()
    package(args.output, args.only_cli_source)
