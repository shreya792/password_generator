import { useState ,useCallback, useEffect,useRef} from 'react'


function App() {
  const [length,setlength]=useState(8)
  const [number,setnumber]=useState(false)
  const [char,setchar]=useState(false)
  const [password,setpassword]=useState("")
  // ref hook
  const passwordRef=useRef(null);
  const passwordGenerator=useCallback(()=>{
   let pass=""
       
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str+="0123456789"
    if(char) str+="@%&$"

for(let i=1;i<=length;i++){
  let char=Math.floor(Math.random()*str.length+1)
  pass+=str.charAt(char)
}
setpassword(pass)


  },[length,number,char,setpassword])
  const copyPasswordToClipboard =useCallback(()=> {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101);
    window.navigator.clipboard.writeText(password)

  },[password])


  useEffect( ()=> {
    passwordGenerator();
  },[setlength,setnumber,setchar,passwordGenerator])


  return (
    <>
    <div className='w-full mt-48 max-w-lg shadow-md rounded-lg px-4 py-4 my-8 text-[#3c2510] bg-[#885729] text-center font-bold  mx-auto'>
      <h1 className='text-white text-center mb-2'>Password Generator</h1>
      <div className='flex shadow-sm rounded-lg overflow-hidden mb-4 '>


      <input type="text"
      value={password}
      className='outline-none w-full py-1 px-3  
      '
      placeholder='password'
      readOnly
      ref={passwordRef}
      
      />
      <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 hover:bg-blue-400'>copy</button>



      </div>

       <div className='flex text-sm gap-x-2'>
      
<div className='flex items-center gap-x-1'>
  <input type="range" 
  min={6}
  max={100}
  value={length}
  className='cursor-pointer'
  onChange={(e) => {setlength(e.target.value)}}
  
  />
<label >length:({length})</label>

</div>
<div className='flex items-center gap-x-1'>
  <input 
  type="checkbox"
  defaultChecked={number}
  id='numberInput'
  onChange={()=>{
    setnumber((prev)=> !prev);
  }}

  
  
  />
  <label htmlFor="numberInput">Numbers</label>



  {/* <label htmlFor="numberInput">Numbers</label> */}
</div>
<div className='flex items-center gap-x-1'>
  <input 
  type="checkbox"
  defaultChecked={char}
  id='charInput'
  onChange={()=>{
    setchar((prev)=> !prev);
  }}
  

  
  
  />
  <label htmlFor="charInput">Characters</label>



</div>


       </div>

    </div>
      
      
    </>
  )
}

export default App
