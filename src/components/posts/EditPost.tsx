import { Formik } from 'formik'
import React, { useRef, useState } from 'react'
import { FaCheck, FaPlus } from 'react-icons/fa6'
import {  PiCameraPlusFill, PiNewspaperFill } from 'react-icons/pi'
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { Api } from '../api/Index';
import { KEYWORD_ADD, POSTS } from '../api/Endpoints';
import Select, { Props as SelectProps, StylesConfig } from 'react-select';



interface formErrors{
    title?:string
    header?:string 
    image?:string
    category?:string
    content?:string
}

interface Keys{
    id:number 
    name:string
}
const editorConfig = {
    toolbarButtons: [
      'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|',
      'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|',
      'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-',
      'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|',
      'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|',
      'print', 'help', 'html', '|', 'undo', 'redo'
    ],
    heightMin:300,
    placeholderText:"متن پست",
    quickInsertTags: []
  };


interface Option {
    value: string;
    label: string;
}

const options: Option[] = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
     { value: 'chocolate', label: 'Chocolate' },
];

  const customStyles: StylesConfig<Option> = {
        control: (provided:any) => ({
            ...provided,
            borderColor: 'transparent',
            boxShadow: 'none', 
            padding:'4px',
            '&:hover': {
                borderColor: 'transparent',
            },
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
            maxHeight:150,
            minHeight:100,
            overflowY:'scroll',
            width:'96%'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'rgba(255, 255, 255, 0.1)' : 'transparent', // Selected background
            color: state.isFocused ? 'black' : 'black', 
            padding: 10,
        }),
    };

export default function EditPost() {
    const [file, setfile] = useState<File|null>(null);
    const [image,setImage]=useState<string|null>(null);
    const [content,setContent]=useState<string>("");
    const [keys,setKeys]=useState<Keys[]|null>(null);

    const [keyname,setKeyname] = useState<string>("")



    const handleContentChange=(model:string)=>{
        setContent(model)
    }

    const handleKeynameChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setKeyname(e.target.value)
    }

    const imgRef=useRef<HTMLInputElement|null>(null);



    const handleImage=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const selectedFile=e.target.files?.[0]
        setfile(selectedFile||null);
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            const filePreview = URL.createObjectURL(selectedFile);
            console.log(selectedFile)
            setImage(filePreview);  
        } else {
            setImage(null);  
        }
    }
    const handleOpenImage=()=>{
        imgRef.current?.click()
    }

// Function to append new ID after filtering
    const addKey = (newKey: Keys) => {
            setKeys((prevKeys) => {
                if (prevKeys === null) {
                    return [newKey];
                }
                const exists = prevKeys.some((key) => key.id === newKey.id);
                if (exists) {
                    return prevKeys;
                }
                return [...prevKeys, newKey];
            });
    };

    const addKeyword=()=>{
        
        Api.post(KEYWORD_ADD,{name:keyname}).then((res)=>{
            addKey(res.data)
            setKeyname("")
        }).catch((err)=>{
            console.log(err)
        })
    }


  
  return (
    <div className='px-32 py-16'>
        <div className="card-dark">
          <div className="card-body py-10 px-20">
            <Formik
                initialValues={{
                    title:"",
                    header:"",
                    image:"",
                    is_active:false,
                    category:"",
                }}
                validate={(values)=>{
                    let errors:formErrors={}
                    if(!values.title){
                        errors.title="عنوان نمی تواند خالی باشد!"
                    }
                    if(!values.header){
                        errors.header="چکیده نمی تواند خالی باشد!"
                    }
                    if(image==null){
                        errors.image="نصویر نمی تواند خالی باشد!"
                    }
                    if(content==""){
                        errors.content="متن نمی تواند خالی باشد!"
                    }
                    if(!values.category){
                        errors.category="دسته‌بندی نمی تواند خالی باشد!"
                    }
                   return errors
                    
                }}
                onSubmit={(values)=>{
                    const formdata=new FormData()
                    formdata.append('title',values.title)
                    formdata.append('header',values.header)
                    if(file){
                        formdata.append('header_image',file)
                    }
                    formdata.append("text",content)
                    formdata.append('is_active',String(values.is_active))

                    Api.post(POSTS,formdata).then((res)=>{
                        console.log(res.data)
                    })
                }}
            >
                {({values,handleSubmit,handleChange,errors,touched})=>(
                    <form onSubmit={handleSubmit}>
                            <div className="flex justify-center">
                                <div className="flex gap-2">
                                <PiNewspaperFill className='text-3xl'/>
                                <p className="text-2xl text-center font-bold mb-10">ویرایش پست</p>
                                </div>
                            
                            </div>
                            <div className="mb-4">
                                <div className="label mb-1">
                                    <span className="label-text-alt text-base">عنوان پست را وارد کنید</span>
                                    <span className="label-text me-2">{values.title.length}/200</span>
                                </div>
                                <input 
                                value={values.title} name="title" onChange={handleChange}
                                type="text" className="input input-bordered w-full rounded-2xl" 
                                />
                                {errors.title  &&<div className="label">
                                    <span className="label-text-alt text-red-600 text-base">{errors.title?.toString()}</span>
                                </div>}
                                                                
                            </div>
                            <div className="mb-4">
                                <input type="file" accept='image/*' className='hidden' onChange={handleImage} ref={imgRef} />
                                <div className="label">
                                    <span className="label-text-alt text-base">تصویر پست را انتخاب کنید</span>
                                </div>
                             {image? <div className='relative '>
                                <img src={image} alt="" className='h-[250px] w-full rounded-xl' />
                                <button
                                    onClick={handleOpenImage}
                                    type='button'
                                    className="absolute inset-0 flex gap-2 items-center justify-center bg-black bg-opacity-25 hover:bg-opacity-[80%] text-white text-xl font-bold py-2 px-4 rounded-xl"
                                >
                                 <PiCameraPlusFill className='text-2xl'/>
                                 تغییر تصویر
                                </button>
                              </div>  
                            :
                            <div className="dashed-card-gray flex justify-center items-center py-16">
                                    <button 
                                        className='btn btn-ghost text-gray-700 hover:bg-blue-100 text-lg' 
                                        onClick={handleOpenImage}
                                        type='button'

                                    >
                                        <PiCameraPlusFill className='text-xl'/>
                                        افزودن تصویر
                                    </button>
                            </div>}
                            {errors?.image &&<div className="label">
                                    <span className="label-text-alt text-red-600 text-base">{errors.image?.toString()}</span>
                                </div>}
                            </div>
                            <div className="mb-5">
                                <div className="label">
                                    <span className="label-text-alt text-base">چکیده پست را وارد کنید</span>
                                    <span className="label-text me-2">{values.header.length}/400</span>

                                </div>
                                <textarea 
                                    value={values.header} name="header"
                                    className="textarea textarea-bordered w-full rounded-2xl" rows={2}
                                />
                                {errors.header &&<div className="label">
                                    <span className="label-text-alt text-red-600 text-base">{errors.header?.toString()}</span>
                                </div>}
                            </div>
                            <div className="mb-6">
                                <div className="label">
                                    <span className="label-text-alt text-base">متن پست را وارد کنید</span>
                                </div> 
                                <FroalaEditorComponent  tag="textarea" 
                                    config={editorConfig}
                                    model={content}
                                    onModelChange={handleContentChange}
                                />
                                {/* <textarea 
                                    className="textarea textarea-bordered w-full rounded-2xl" rows={7}
                                /> */}
                               {content=="" &&<div className="label">
                                    <span className="label-text-alt text-red-600 text-base">{errors.title?.toString()}</span>
                                </div>}
                            </div>
                            <div className="mb-16">
                                
                                <div className="md:flex gap-5">
                                    <div className='w-full'>
                                        <div className="label">
                                            <span className="label-text-alt text-base">کلمات کلیدی را اضافه کنید</span>
                                        </div>
                                        <label className="input input-bordered flex items-center rounded-2xl w-full gap-2 mb-4">
                                            <input type="text" className="grow"
                                              value={keyname} 
                                              onChange={handleKeynameChange}  
                                             />
                                            {keyname.length > 0 && 
                                                <button 
                                                    className='btn btn-ghost  btn-sm'
                                                    type='button'
                                                    onClick={addKeyword}
                                                >
                                                  <FaPlus/>
                                                  افزودن
                                                </button>
                                            }
                                        </label>
                                        <div className='flex flex-wrap gap-3'>
                                        {keys?.map((key:Keys,idx:number)=>(
                                            <button 
                                                key={idx} type="button"
                                                className='btn btn-success hover:btn-error hover:text-white btn-sm w-max-xs rounded-full text-white'>
                                                # {key.name}
                                            </button>
                                        ))}
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <div className="label">
                                            <span className="label-text-alt text-base">دسته‌بندی را انتخاب کنید</span>
                                        </div>
                                        <Select
                                            isClearable
                                            options={options}
                                            styles={customStyles}
                                            className="input input-bordered rounded-xl"
                                            placeholder="نام دسته‌بندی"
                                        />
                                        {/* <label className="input input-bordered flex items-center rounded-2xl w-full gap-2 mb-6">
                                            <FaSearch className='text-gray-600'/>
                                            <input type="text" className="grow"/>

                                        </label> */}
                                        <div>

                                        </div>
                                    </div>    
                            </div>
                            
                            </div>
                            <div className="md:flex justify-between items-center mb-5">
                                <div className="form-control">
                                <label className="cursor-pointer label">
                                    <input
                                        type="checkbox"
                                        checked={values.is_active}
                                        name="is_active"
                                        onChange={handleChange}
                                        className="checkbox  border-blue-500 [--chkbg:theme(colors.blue.500)] checked:border-blue-500" 
                                    />
                                    <span className="label-text mx-3 text-lg">این پست قابل مشاهد باشد</span>
                                </label>
                                
                                </div>
                                <button 
                                    className='btn-blue md:w-80 rounded-2xl text-lg font-semibold'
                                    type='submit'
                                >
                                <FaCheck/>
                                    ایجاد پست
                                </button>
                            </div>
                            </form>
                )}
               
            </Formik>
          
          </div>
        </div>
    </div>
  )
}

