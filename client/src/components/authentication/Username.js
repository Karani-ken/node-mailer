import React from 'react'
import {Link} from 'react-router-dom'
import avatar from '../../assets/profile.png'
import styles from '../../styles/Username.module.css'
import {Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import {usernameValidate} from '../../helper/validate'
const Username = () => {
  const formik = useFormik({
    initialValues:{
      username:""
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      console.log(values)
    }
  })
  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false}>

      </Toaster>
        <div className='flex justify-center items-center h-screen'>
          <div className={styles.glass}>
              <div className='title flex flex-col items-center'>
                <h4 className='text-5xl font-bold '>Hello Again!</h4>
                <span className='py-1 text-xl w-2/3 text-center text-gray-500'>
                  Explore More by connecting with us
                </span>
              </div>
              <form className='py-1' onSubmit={formik.handleSubmit}>
                <div className='profile flex justify-center py-4'>
                    <img src={avatar} className={styles.profile_img} alt='avater'/>
                </div>
                <div className='textbox flex flex-col items-center'>
                  <input {...formik.getFieldProps('username')} type='text'className={styles.textbox} placeholder='username'/>
                  <input type='submit' className={styles.btn} placeholder='Lets go'/>
                </div>
                <div className='text-center py-4'>
                    <span className='text-gray-500'>Not a member <Link to='/register' className='text-red-500'
                    >Register now</Link></span>
                </div>

              </form>
          </div>

        </div>

    </div>
  )
}

export default Username