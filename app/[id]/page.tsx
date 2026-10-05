import React from "react";
import data from "@/lib/data.json";
import {
  agreementsToCount,
  countResponses,
  programsToCount,
  rolesToCount,
} from "@/lib/utils";
import RoleChart from "@/components/RoleChart";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import ProgramChart from "@/components/ProgramChart";
import DeepThinkingChart from "@/components/DeepThinkingChart";
import BeneficialChart from "@/components/BeneficialChart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Metadata } from "next";

type Params = {
  id: number;
};

const Session = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  const session = data[id];

  const roles = countResponses(session, rolesToCount, "Question 1");
  const programs = countResponses(session, programsToCount, "Question 3");
  const deepThinking = countResponses(session, agreementsToCount, "Question 4");
  const beneficial = countResponses(session, agreementsToCount, "Question 5");
  const goals = countResponses(session, agreementsToCount, "Question 7");
  const sessionFeedback = session.Feedback.filter(
    (item) => item["Question 6"],
  ).map((item) => item["Question 6"]);
  const delivery = session.Feedback.filter((item) => item["Question 8"]).map(
    (item) => item["Question 8"],
  );
  const improved = session.Feedback.filter((item) => item["Question 9"]).map(
    (item) => item["Question 9"],
  );
  const topics = session.Feedback.filter((item) => item["Question 10"]).map(
    (item) => item["Question 10"],
  );
  return (
    <div className="p-4 lg:p-8">
      <h2 className="text-center text-3xl font-black py-4 lg:py-8">
        {session.SessionTitle}
      </h2>
      <p className="text-center font-light text-xs">
        {session.Feedback.length} Ratings Submitted
      </p>
      <div className="flex flex-wrap justify-center gap-4 lg:gap-8 p-4 lg:p-8">
        <Card className="min-w-[320px] lg:min-w-[600px]">
          <CardHeader>
            <CardTitle className="text-center">Roles present</CardTitle>
          </CardHeader>
          <CardContent>
            <RoleChart data={roles} />
          </CardContent>
        </Card>
        <Card className="min-w-[320px] lg:min-w-[600px]">
          <CardHeader>
            <CardTitle className="text-center">When I attended...</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgramChart data={programs} />
          </CardContent>
        </Card>
        <Card className="min-w-[320px] lg:min-w-[600px]">
          <CardHeader>
            <CardTitle className="text-center">
              This session made me think deeply...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DeepThinkingChart data={deepThinking} />
          </CardContent>
        </Card>
        <Card className="min-w-[320px] lg:min-w-[600px]">
          <CardHeader>
            <CardTitle className="text-center">
              I felt this session was beneficial...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BeneficialChart data={beneficial} />
          </CardContent>
        </Card>
        <Card className="min-w-[320px] lg:min-w-[600px]">
          <CardHeader>
            <CardTitle className="text-center">
              I felt this session was aligned with my goals...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BeneficialChart data={goals} />
          </CardContent>
        </Card>
      </div>
      <hr />
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="cursor-pointer">
              <h2 className="font-bold text-center lg:text-2xl">
                Session Feedback
              </h2>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc text-xl font-light">
                {sessionFeedback.map((item, i) => (
                  <li key={item + i} className="ml-8">
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="cursor-pointer">
              <h2 className="font-bold text-center lg:text-2xl">
                How will it affect my classroom?
              </h2>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc text-xl font-light">
                {delivery.map((item, i) => (
                  <li key={item + i + 1} className="ml-8">
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="cursor-pointer">
              <h2 className="font-bold text-center lg:text-2xl">
                How can TLI be improved?
              </h2>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc text-xl font-light">
                {improved.map((item, i) => (
                  <li key={item + i + 2} className="ml-8">
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="cursor-pointer">
              <h2 className="font-bold text-center lg:text-2xl">
                Future TLI topic ideas
              </h2>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc text-xl font-light">
                {topics.map((item, i) => (
                  <li key={item + i + 3} className="ml-8">
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export async function generateMetadata(props: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const params = await props.params;
  const session = data[params.id];
  return {
    title: `${session.SessionTitle}`,
  };
}

export default Session;
