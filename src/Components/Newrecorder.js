export default function Newrecorder(){
    const handle=()=>{               //used to view new recorder
        setvisible(true)
        setvisible1(false)
        setvisible2(false)
        // settempurl(e)
      }
      const handlechange=(e)=>{           //for handling new recording
        setaud(e)
      }
      const savefile=(file)=>{            //for saving the new recording into s3 bucket
        console.log(file)
        var date= Date.now();
        Storage.put(`Recording ${date}`,file,{
          contentType:"audio/wav"
        }).then(()=>{
          setopen(true)
          console.log("successfully stored");
          console.log("type:"+typeof({file}))
         
        })
        .catch((err)=>{
          console.log(err);
        })
      }
      const handleRest=()=> {                 //used for resetting the recording 
        const reset = {
          url: null,
          blob: null,
          chunks: null,
          duration: {
            h: 0,
            m: 0,
            s: 0
          }
        };
        setaud(reset)
      }
}