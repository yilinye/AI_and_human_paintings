# AI_and_human_paintings

## Data
The human and AI painting datasets used in our reseach can be accessed at https://drive.google.com/drive/folders/1ITG9zLnn2NkK1_PS7B9UBa5DitXrawum?usp=sharing

## Latent Space Embedding
Run the code in Latent_Space_Embedding.ipynb to compute and save the high-dimensional embedding and the dimension reduction results for painting images.

## Aesthetic Features
Run the code in Aesthetic_features.ipynb to compute and save the aesthetic features for painting images.

## Visualization
First, to visualize latent space overview and aesthetic features, install the project in VIS4AI_Art on local machine; you need to have Anaconda python, Node.js and the following python packages installed to run the code
```sh
tensorflow==2.8.0
numpy==1.21.6
Flask_Cors==3.0.6
pandas==0.23.4
Flask==2.1.1
Pillow==9.1.0
```
Second
### How To Run the VIS4AI_Art Project

#### Backend -- Flask

##### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) or [Pycharm](https://www.jetbrains.com/pycharm/download/#section=windows) 

##### Enter the Folder

```sh
cd Backend
```

##### Compile and Run for Development
```sh
set FLASK_APP=app.py
flask run
```

#### Frontend -- Vue

##### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

##### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

##### Enter the Folder

```sh
cd Frontend
```

##### Project Setup

```sh
npm install
```

##### Compile and Hot-Reload for Development

```sh
npm run dev
```

##### Compile and Minify for Production

```sh
npm run build
```
---

