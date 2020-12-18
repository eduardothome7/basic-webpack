const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports =  {
	entry: './src/javascript/index.js',
	output:  {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				// Apply rule for .sass, .scss or .css files
			    test: /\.(sa|sc|c)ss$/,

			    // Set loaders to transform files.
			    // Loaders are applying from right to left(!)
			    // The first loader will be applied after others
			    use: [
			    	{
			    		loader: MiniCssExtractPlugin.loader
			    	},
			       	{
			       		loader: "css-loader"
			       	},
			       	{
			       		loader: "postcss-loader"
			       	},
			       	{
			       		loader: "sass-loader",
				       	options : {
				       		implementation: require("sass")
				       	}
			       	},
			    ]
			},
			{
			    // Now we apply rule for images
			    test: /\.(png|jpe?g|gif|svg)$/,
			    use: [
			    	{
			        	// Using file-loader for these files
			            loader: "file-loader",

			            // In options we can set different things like format
			            // and directory to save
			            options: {
			                outputPath: 'images'
			            }
			        }
			    ]
    		},
		  	{
      		// Apply rule for fonts files
		      	test: /\.(woff|woff2|ttf|otf|eot)$/,
		      	use: [
		            {
		               	// Using file-loader too
		               	loader: "file-loader",
		                options: {
		                	outputPath: 'fonts'
		               	}
		            }
		        ]
		    }
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "bundle.css"
		})
	],
	mode: 'development'
}