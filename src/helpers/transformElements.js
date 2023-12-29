import { ChatBubbleIcon } from "@/components/icons/ChatBubbleIcon";


function transformElements(data) {

    function convertQuestions(inputs) {
      return inputs.map(input => ({
          href: '#',
          name: 'Derived Question',
          description: input.derivedQuestion,
          icon: ChatBubbleIcon,  // Assuming ChatBubbleIcon is already defined elsewhere in your code
          pattern: {
              y: -6,
              squares: [
                  [-1, 2],
                  [1, 3],
              ],
          },
          semContext: input.semContext,
          synContext: input.synContext,
          category: input.category,
          extraContentAnswer: input.extraContentAnswer,
          predefinedId: input.autoID,
          answer: input.predAnswers
      }));
  }
  
    const transformedLinks = data.map(item => ({
      title: item.elemName,
      href: item.elemID.toString(),
      elemDescr: item.elemDescr,
      elemOrder: item.elemOrder,
      idsrQPID: item.idsrQPID,
      idsrQListing: item.idsrQListing,
      qOptions: item.qOptions,
      elemQuestion: item.elemQuestion.length !=0? convertQuestions(item.elemQuestion):[],  
      rationale: item.rationale !== undefined ? item.rationale : 0,
      options: item.options.length !=0? item.options:0
    }));
  
    return [
      {
        title: 'Form Fields',
        links: transformedLinks
      }]
  }

  export {transformElements}