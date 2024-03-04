tsc --noemit
postcss src/**/*.{css,less,scss} --base src --dir build
babel src --extensions .js,.jsx,.ts,.tsx --out-dir lib
