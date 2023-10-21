import React, { ChangeEventHandler, useState } from 'react'
import { BsUpload } from 'react-icons/bs'

const Dragdropfile = ({
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
				className='border-slate-400 relative my-3 mx-auto w-full justify-center rounded-md border-2 border-dashed bg-green-700 text-center z-[9999]'
			>
				<input
					ref={inputRef}
					type='file'
					multiple={multiple}
					onChange={handleChange}
					className='hidden'
				/>
				<label
					className={`flex flex-col items-center justify-center border-none p-4 ${isHovering ? 'bg-[#ffffff]' : 'bg-[#102762]'
						}`}
					htmlFor='input-file-upload'
				>
					<BsUpload fontSize={25} />
					<div className='text-sm'>
						{!multiple ? 
						<p className='p-2 font-bold'>Upload your image here</p> :
						<p className='p-2 font-bold'>Upload the pictures here</p> 
						}
					</div>
				</label>
			</div>
		</>
	)
}

export default Dragdropfile
