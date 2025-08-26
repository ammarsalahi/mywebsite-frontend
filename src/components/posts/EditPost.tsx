import { Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { FaCheck, FaPlus } from 'react-icons/fa6'
import {  PiCameraPlusFill, PiNewspaperFill } from 'react-icons/pi'
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { Api } from '../api/Index';
import { CATEGORIES, KEYWORD_ADD, KEYWORDS_ID, POSTS, POSTS_ID } from '../api/Endpoints';
import Select, { StylesConfig } from 'react-select';
import { AuthConfigHeaderFile } from '../api/Configs';
import { useRecoilValue } from 'recoil';
import { tokenSelector } from '../states/Selectors';
import { message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Post } from '../types';



interface formErrors{
    title?:string
    header?:string 
    category?:string
    content?:string
}

interface Keys{
    id:number 
    name:string
}

interface CategoryItem{
    id:number;
    name:string;
}
interface PostItem{
    title:string;
    text:string;
    header:string;
    is_active:boolean;
    category:CategoryItem;
}




interface Option {
    value: string;
    label: string;
}



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
 
interface postprops{
    theme:string,
    id:string
}    

export default function AddPost(props:postprops) {
    const [news,setNews]=useState<Post|null>(null);

    const [file, setfile] = useState<File|null>(null);
    const [image,setImage]=useState<string|null>(null);
    const [keys,setKeys]=useState<Keys[]|null>(null);

    const [keyname,setKeyname] = useState<string>("")
    const [options,setOptions] =useState<Option[]>([]);

    const [isLoad, setIsLoad] = useState<boolean>(false);

    const token=useRecoilValue(tokenSelector);

    const {t}= useTranslation();

    let navigate = useNavigate();

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    message.config({
        top: document.documentElement.clientHeight - 100,
    });

    const getCategories=async()=>{
        try{
            const response = await Api.get(CATEGORIES);
            const data = response.data.results.map((category:{id:number,name:string})=>({
                value:category.id,
                label:category.name
            }))
            setOptions(data)
        }catch(error){
            //error
        }
            
    }
    const getPost=async(id:string)=>{
        await Api.get(POSTS_ID(id)).then((res)=>{
            setNews(res.data)
            setKeys(res.data.keywords);
            setImage(res.data.header_image)
            setIsLoad(true)
        })
    }

    useEffect(() => {
      getCategories();
      getPost(props.id)
    }, [props.id])
    
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
        placeholderText:t('potext'),
        quickInsertTags: []
      };

    const handleKeynameChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setKeyname(e.target.value)
    }

    const imgRef=useRef<HTMLInputElement|null>(null);



    const handleImage=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const selectedFile=e.target.files?.[0]
        setfile(selectedFile||null);
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            const filePreview = URL.createObjectURL(selectedFile);
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

    const deleteKey = (keyId: number) => {
        setKeys((prevKeys) => {
            if (prevKeys === null) {
                return prevKeys;
            }
            return prevKeys.filter((key) => key.id !== keyId);
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
    const deleteKeyword=(id:number)=>()=>{
        Api.delete(KEYWORDS_ID(id)).then((res)=>{
            deleteKey(id)
        });
    }


  
  return (
    <div>
        {
        isLoad?
        <div className={props.theme=="dark"?"card-dark":"card-light"}>
          <div className="md:card-body md:py-10 md:px-20">
            <Formik
                initialValues={{
                    title:news?.title||"",
                    header:news?.header||"",
                    content:news?.text||"",
                    is_active:news?.is_active,
                    category:news?.category.id||'',
                }}
                validate={(values)=>{
                    let errors:formErrors={}
                  
                    if(!values.title){
                        errors.title=t('notempty')
                    }
                    if(!values.header){
                        errors.header=t('notempty')
                    }
                    if(!values.content){
                        errors.content=t('notempty')
                    }
                    if(!values.category){
                        errors.category=t('notempty')
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
                    formdata.append("text",values.content)
                    formdata.append('is_active',String(values.is_active))
                    formdata.append('category',String(values.category))
                    keys?.forEach((key:Keys)=>{
                        formdata.append('keywords',String(key.id))
                    })
                    

                    Api.patch(POSTS_ID(props.id),formdata,{headers:AuthConfigHeaderFile(token.access)}).then((res)=>{
                        message.success(t('accepted'));
                        sleep(3000)
                        navigate("/posts")
                    }).catch((err)=>{
                        console.log(err)
                        message.error(t('notaccepted'))
                    })
                }}
            >
                {({values,handleSubmit,handleChange,errors,setFieldValue,touched})=>(
                    <form onSubmit={handleSubmit}>
                            <div className="flex justify-center">
                                <div className="flex gap-2">
                                <PiNewspaperFill className='text-3xl'/>
                                <p className="text-2xl text-center font-bold mb-10">{t('postaddtitle')}</p>
                                </div>
                            
                            </div>
                            <div className="mb-4">
                                <div className="label mb-1">
                                    <span className="label-text-alt text-base">{t('posttitle')}</span>
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
                                    <span className="label-text-alt text-base">{t('postimg')}</span>
                                </div>
                             {image? <div className='relative '>
                                <img src={image} alt="" className='h-[250px] w-full rounded-xl' />
                                <button
                                    onClick={handleOpenImage}
                                    type='button'
                                    className="absolute inset-0 flex gap-2 items-center justify-center bg-black bg-opacity-25 hover:bg-opacity-[80%] text-white text-xl font-bold py-2 px-4 rounded-xl"
                                >
                                 <PiCameraPlusFill className='text-2xl'/>
                                 {t('imgbtnch')}
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
                                        {t('imgbtn')}
                                    </button>
                            </div>}
                            {image==null &&<div className="label">
                                    <span className="label-text-alt text-red-600 text-base"></span>
                                </div>}
                            </div>
                            <div className="mb-5">
                                <div className="label">
                                    <span className="label-text-alt text-base">{t('posthead')}</span>
                                    <span className="label-text me-2">{values.header.length}/400</span>

                                </div>
                                <textarea 
                                    value={values.header} name="header" onChange={handleChange}
                                    className="textarea textarea-bordered w-full rounded-2xl" rows={2}
                                />
                                {errors.header &&<div className="label">
                                    <span className="label-text-alt text-red-600 text-base">{errors.header?.toString()}</span>
                                </div>}
                            </div>
                            <div className="mb-6">
                                <div className="label">
                                    <span className="label-text-alt text-base">{t('posttext')}</span>
                                </div> 
                                <FroalaEditorComponent  tag="textarea" 
                                    config={editorConfig}
                                    model={values.content}
                                    onModelChange={(model:string)=>setFieldValue('content',model)}
                                />
                               
                               {errors.content &&<div className="label">
                                    <span className="label-text-alt text-red-600 text-base">{errors.content?.toString()}</span>
                                </div>}
                            </div>
                            <div className="mb-16">
                                
                                <div className="md:flex gap-5">
                                    <div className='w-full'>
                                        <div className="label">
                                            <span className="label-text-alt text-base">{t('postkey')}</span>
                                        </div>
                                        <label className="input input-bordered flex items-center rounded-2xl w-full gap-2 mb-4">
                                            <input type="text" className="grow"
                                              value={keyname} 
                                              onChange={handleKeynameChange} 
                                              placeholder={t('keyname')} 
                                             />
                                            {keyname.length > 0 && 
                                                <button 
                                                    className='btn btn-ghost  btn-sm'
                                                    type='button'
                                                    onClick={addKeyword}
                                                >
                                                  <FaPlus/>
                                                  {t('add')}
                                                </button>
                                            }
                                        </label>
                                        <div className='flex flex-wrap gap-3'>
                                        {keys?.map((key:Keys,idx:number)=>(
                                            <button 
                                                key={idx} type="button"
                                                onClick={deleteKeyword(key.id)}
                                                className='btn bg-blue-600 hover:btn-error hover:text-white btn-sm w-max-xs rounded-full text-white'>
                                                # {key.name}
                                            </button>
                                        ))}
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <div className="label">
                                            <span className="label-text-alt text-base">{t('postcat')}</span>
                                        </div>
                                        <Select
                                            isClearable
                                            options={options}
                                            styles={customStyles}
                                            className="input input-bordered bg-white rounded-xl"
                                            placeholder={t('catname')}
                                            value={options.find(option => option.value === values.category) || null}
                                            onChange={(selectedOption:any) => {
                                                setFieldValue('category', selectedOption ? selectedOption.value : '');
                                            }}
                                        />
                                        
                                    
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
                                    <span className="label-text mx-3 text-lg">{t('postshow')}</span>
                                </label>
                                
                                </div>
                                <button 
                                    className='btn-blue w-full mt-5 md:mt-0 md:w-80 rounded-2xl text-lg font-semibold'
                                    type='submit'
                                >
                                <FaCheck/>
                                    {t('edit')}
                                </button>
                            </div>
                            </form>
                )}
               
            </Formik>
          
          </div>
        </div>
        :
        <div className="pt-32 grid place-items-center">
               <Spin className="text-red-200"/>
        </div>
        }
    </div>
  )
}

