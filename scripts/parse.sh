tsc --noemit
postcss src/**/*.{css,scss} --base src --dir build
babel src --extensions .js,.jsx,.ts,.tsx --out-dir lib
