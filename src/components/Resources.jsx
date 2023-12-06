import Link from 'next/link'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { useRef,useState,useEffect } from 'react'
import { GridPattern } from '@/components/GridPattern'
import { Heading } from '@/components/Heading'
import { ChatBubbleIcon } from '@/components/icons/ChatBubbleIcon'
import { EnvelopeIcon } from '@/components/icons/EnvelopeIcon'
import { UserIcon } from '@/components/icons/UserIcon'
import { UsersIcon } from '@/components/icons/UsersIcon'

const resources = [
 
  {
    href: '1',
    name: 'How do you fill the type of case field?',
    description:
      'Learn about the conversation model and how to create, retrieve, update, delete, and list conversations.',
    icon: ChatBubbleIcon,
    pattern: {
      y: -6,
      squares: [
        [-1, 2],
        [1, 3],
      ],
    },
  },
  
  {
    href: '2',
    name: 'Conversations',
    description:
      'Learn about the conversation model and how to create, retrieve, update, delete, and list conversations.',
    icon: ChatBubbleIcon,
    pattern: {
      y: -6,
      squares: [
        [-1, 2],
        [1, 3],
      ],
    },
  }
  ,
  
  {
    href: '3',
    name: 'Conversations',
    description:
      'Learn about the conversation model and how to create, retrieve, update, delete, and list conversations.',
    icon: ChatBubbleIcon,
    pattern: {
      y: -6,
      squares: [
        [-1, 2],
        [1, 3],
      ],
    },
  },
  
  
  
  
]

function ResourceIcon({ icon: Icon }) {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-emerald-300/10 dark:group-hover:ring-emerald-400">
      <Icon className="h-5 w-5 fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-emerald-300/10 dark:group-hover:stroke-emerald-400" />
    </div>
  )
}

function ResourcePattern({ mouseX, mouseY, ...gridProps }) {
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5"
          {...gridProps}
        />
      </div>
      <motion.div
className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[rgba(82,131,163,0.2)] to-[#ffffff] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#202D2E] dark:to-[#303428]"
style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10"
          {...gridProps}
        />
      </motion.div>
    </div>
  )
}


function truncateDescription(description, maxLength = 200) {
  if (description.length > maxLength) {
    return description.substring(0, maxLength - 3) + "..."; // -3 to account for "..."
  }
  return description;
}


function Resource({ setAutoId, resource,index,chatQuestion,setChatQuestion ,setCurrentKnowledgeBase,setSynContext, setSemContext}) {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      key={resource.href}
      onMouseMove={onMouseMove}
      className="group h-auto relative flex rounded-2xl bg-white transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5"
    >
      {/*<ResourcePattern {...resource.pattern} mouseX={mouseX} mouseY={mouseY} />*/}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-grey/7.5 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
      <div className="relative rounded-2xl px-4 pt-0 pb-4">
  {/* <ResourceIcon icon={resource.icon} />*/}
        <h3 className="mt-0 text-sm font-semibold leading-0 text-zinc-900 dark:text-white">
          <button 
            className="focus:outline-none" 
            onClick={() => {
                 setAutoId(resource.predefinedId);
                 console.log('autoId',resource.predefinedId);

               setCurrentKnowledgeBase('GENERAL');
              setChatQuestion(resource.description);
              resource.semContext ? setSemContext(resource.semContext): null;
              resource.synContext ? setSynContext(resource.synContext): null;
            }}
          >
            <span className="absolute inset-0 rounded-2xl" />
              
          </button>
        </h3>
        <p  style={{fontSize:'14px'}}  className="mt-0 text-base font-normal  leading-normal text-zinc-500 leading-tight dark:text-zinc-400" font-family='Inter'>
        {resource.index}. {truncateDescription(resource.description)}
        </p>
      </div>
   </div>
);

}


function handleNext(questionsIndex,setQuestionsIndex) {
   const nextValue = questionsIndex +  1; 
  setQuestionsIndex(nextValue);
}
function handlePrevious(questionsIndex,setQuestionsIndex) {
  const nextValue = questionsIndex -  1; 
 setQuestionsIndex(nextValue);
}

export function Resources({autoId, setAutoId,questions,chatQuestion,setChatQuestion,total,setCurrentKnowledgeBase,setSynContext, setSemContext }) {
  const [selectedId, setSelectedId] = useState(null)
  const [questionsIndex, setQuestionsIndex] = useState(0)



  return (
    <>
        <Heading level={2} id="resources" className='mt-20'> Frequently Asked Questions</Heading>
    <div className="my-16 xl:max-w-none border-t border-zinc-900/5  mt-5" font-family='Inter' >
          <p style={{fontSize:'16px'}} className='text-gray-500' >These questions come from our in-depth discussions with health professionals involved in data collection. You can use any of these by clicking them to see how IntelSurv answers them.</p>

        <div className="not-prose mt-0  gap-8  pt-10 dark:border-white/5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {questions[questionsIndex].map((resource, index) => (
                <Resource  setAutoId={setAutoId}    key={resource.href} resource={resource} index={index} chatQuestion={chatQuestion}  setCurrentKnowledgeBase={setCurrentKnowledgeBase} setChatQuestion={setChatQuestion}  setSynContext={setSynContext} setSemContext={setSemContext} />
            ))}
      

        </div>
        <div style={{marginTop:'40px' }}> 
        {questions[questionsIndex - 1] !=null && <button style={{marginRight:'10px'}}
    className="bg-white border border-gray-200 px-4 py-1 " 
    onClick={() => handlePrevious(questionsIndex, setQuestionsIndex)}
>
    PREVIOUS QUESTIONS
</button>}
       {questions[questionsIndex + 1] !=null && <button 
    className="bg-white border border-gray-200 px-4 py-1 " 
    onClick={() => handleNext(questionsIndex, setQuestionsIndex)}
>
   MORE QUESTIONS
</button>}
</div>
     
    </div>
    </>
    
);

  
}
