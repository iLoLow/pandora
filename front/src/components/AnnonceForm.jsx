import "../styles/AnnonceForm.css"
import Button from "../components/Button"
import Dropzone from "react-dropzone"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

function AnnonceForm({ values, setValues, errors, handleSubmit = () => {} }) {
	return (
		<form className="formAnnonce" method="POST" onSubmit={handleSubmit}>
			<form-group>
				<label htmlFor="title">Titre :</label>
				<input type="text" name="title" id="title" value={values.title} onChange={(e) => setValues({ ...values, title: e.target.value })} />
				{errors.title && <small className="errorSmall">{errors.title}</small>}
			</form-group>
			<form-group>
				<label htmlFor="description">Description :</label>
				{/* <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          value={values.description}
          onChange={(e) => setValues({ ...values, description: e.target.value })}
        ></textarea> */}
				<Editor
					options={{
						toolbar: {
							options: ["inline", "blockType", "fontSize", "fontFamily", "list", "textAlign", "emoji", "remove", "history"],
							inline: {
								options: ["bold", "italic", "underline", "strikethrough"],
							},
							list: {
								options: ["unordered", "ordered"],
							},
							textAlign: {
								options: ["left", "center", "right", "justify"],
							},
							history: {
								options: ["undo", "redo"],
							},
						},
					}}
					editorState={values.description}
					onEditorStateChange={(editorState) => setValues({ ...values, description: editorState })}
					wrapperClassName="wrapper-class"
					editorClassName="editor-class"
					toolbarClassName="toolbar-class"
				/>
			</form-group>
			<Dropzone
				multiple={false}
				onDrop={(acceptedFiles) => setValues({ ...values, image: acceptedFiles[0], image_url: "/assets/" + acceptedFiles[0].name })}
			>
				{({ getRootProps, getInputProps }) => (
					<div {...getRootProps()} className="dropzone">
						<div className={errors.image ? "zone zone-error" : "zone"}>
							<input {...getInputProps()} />
							{errors.image ? (
								<small className="errorSmall">{errors.image}</small>
							) : values.image ? (
								<p>Image choisie : {values.image.name}</p>
							) : values.image_url ? (
								<p>Image choisie : {values.image_url.split("/assets/")[1]}</p>
							) : (
								<p>Glissez-déposez une image ici, ou cliquez pour sélectionner une image.</p>
							)}
						</div>
					</div>
				)}
			</Dropzone>
			<Button type="submit" children="Valider" />
		</form>
	)
}

export default AnnonceForm
