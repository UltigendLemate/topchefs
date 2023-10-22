import React, { ChangeEventHandler, useState } from 'react'
import { BsUpload } from 'react-icons/bs'
import { Field } from 'formik'
const Dragdropfiles = ({
	setUploadFiles, multiple
}: {
	setUploadFiles: (files: FileList) => void,
	multiple ?: boolean
}) => {
	const [isHovering, setIsHovering] = useState(false)
	// ref
	const inputRef = React.useRef<HTMLInputElement>(null)

	// triggers when file is selected with click
	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault()
		if (e.target.files) {
			setUploadFiles(e.target.files)
		}
	}

	// triggers the input when the button is clicked
	const onButtonClick = () => {
		inputRef.current?.click()
	}

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		setIsHovering(true)
	}

	const handleDragLeave = () => {
		setIsHovering(false)
	}

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		setIsHovering(false)
		setUploadFiles(event.dataTransfer.files)
	}

	return (
		<>
			<div
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={() => inputRef.current?.click()}
				style={{ background: isHovering ? 'lightgray' : 'white' }}
				className='border-slate-400 relative  mx-auto w-full justify-center items-center rounded-md border-2 border-dashed  h-full text-center '
			>
				<input
					ref={inputRef}
					type='file'
					multiple={multiple}
					onChange={handleChange}
					className='hidden'
				/>

				<label
					className={`flex flex-col h-full items-center justify-center border-none p-4 ${isHovering ? 'bg-[#ffffff]' : 'bg-blue-700'
						}`}
					htmlFor='input-file-upload'
				>
					{/* <BsUpload fontSize={25} /> */}
					<p className='text-5xl'>+</p>
					<div className='text-sm'>
						
						<p className='p-2 font-bold'>Upload</p> 
						
					</div>
				</label>
			</div>
		</>
	)
}

export default Dragdropfiles
