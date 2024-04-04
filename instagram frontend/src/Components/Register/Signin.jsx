import { Box, Button, FormControl, FormErrorMessage, Input} from '@chakra-ui/react'
import {Formik, Form, Field } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { signInAction } from '../../Redux/Auth/Action'
import { getUserProfile } from '../../Redux/User/Action'

const validateSchema = Yup.object().shape({
  email : Yup.string().email("Invalid email address ").required("Email is required"),
  password : Yup.string().min(8,"Password must be atleast 8 characters").required("Password is required")
})

const Signin = () => {

  const initialValues = {email : "", password : ""}

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(store => store);
 const jwt = localStorage.getItem("token");

  function handleSubmit(values, actions) {
   dispatch(signInAction(values));
   actions.setSubmitting(false);
    // console.log("values : ",values);
  }

  useEffect(()=>{
    if(jwt) {
      dispatch(getUserProfile(jwt))
    }

  },[jwt])

  useEffect(()=>{
    if(user.reqUser?.username) {
      // ${user.reqUser?.username}
      navigate(`/`)
    }
  },[jwt,user.reqUser])

  function handleNavigate() {
    navigate("/signup")
  }

  return (
    <div>
        <div className='border' >
            <Box p={8} display={'flex'} flexDirection={'column'} alignItems={'center'} >
                
                <img className='mb-5' src="https://i.imgur.com/zqpwkLQ.png" alt="" />

                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={validateSchema}
                >

                    {(formkProps) => (<Form className='space-y-8' >
                          <Field name="email" >
                              {({field, form}) => <FormControl isInvalid={form.errors.email && form.touched.email} >
                                      <Input
                                       className="w-full"
                                        {...field} id="email" 
                                        placeholder='Mobile Number or Email' >
                                      </Input>

                                      <FormErrorMessage> {form.errors.email} </FormErrorMessage>
                              </FormControl> }
                          </Field>


                          <Field name="password" >
                              {({field, form}) => <FormControl isInvalid={form.errors.password && form.touched.password} >
                                      <Input
                                       className="w-full"
                                        {...field} id="password" 
                                        placeholder='Password' >
                                      </Input>

                                      <FormErrorMessage> {form.errors.password} </FormErrorMessage>
                              </FormControl> }
                          </Field>

                          <p className='text-center text-sm' >People who use our services may have uploaded your contact information to instagram. Learn More</p>

                          <p className='text-center text-sm' >By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.</p>

                          <Button className='w-full' mt={4} colorScheme='blue' type='submit' isLoading={formkProps.isSubmitting} >
                            Sign In
                          </Button>

                    </Form>) }

                          
               
                </Formik>


            </Box>
        </div>

        <div className='border w-full border-slate-300 mt-5' >
          <p className='text-center py-2 text-sm' >If You Don't Have Account <span onClick={handleNavigate} className='ml-2 text-blue-700 cursor-pointer' >Sign Up</span> </p>
        </div>

    </div>
  )
}

export default Signin