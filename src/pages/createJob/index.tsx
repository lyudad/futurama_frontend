import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormInterface } from "../../types/createjob";
import Human from "../../assets/human.png";
import {
    Block,
    Button,
    Content,
    Form,
    Image,
    Input,
    Label,
    LeftBlock,
    Option,
    RightBlock,
    Select,
    Separator,
    Text,
    TextArea,
    Wrapper
} from "./styles";

const categories: string[] = ["Development", "Maintenance", "Sales"];
const defaultSkills: string[] = ["Account managment", "HTML", "CSS", "Analitycs skills", "Mysql", "Nodejs", "Python"];

export function CreateJob(): JSX.Element {
    const [skills, setSkills] = useState<string[]>(defaultSkills);
    const [customSkill, setCustomSkill] = useState<string>("");
    const [form, setForm] = useState<FormInterface>({
        headline: '',
        duration: '',
        category: '',
        skills: [],
        rate: '',
        desc: ''
    });

    useEffect(() => {
        document.title = "Create job";
    }, []);

    function typingHandler(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    function selectHandler(event: ChangeEvent<HTMLSelectElement>): void {
        setForm({ ...form, category: event.target.value });
    };

    function pickSkillHandler(event: MouseEvent<HTMLButtonElement>): void {
        const skillName = event.currentTarget.name;

        if (form.skills.includes(skillName)) {
            setSkills(arr => { return [...arr, skillName] });
            setForm({ ...form, skills: form.skills.filter(item => { return item !== skillName }) });
        } else {
            setSkills(skills.filter(item => { return item !== skillName }));
            setForm(frm => { return { ...form, skills: [...frm.skills, skillName] } });
            setCustomSkill("");
        }
    };

    function skillsHandler(event: ChangeEvent<HTMLInputElement>): void {
        setCustomSkill(event.target.value);
    };

    return (
        <Content>
            <LeftBlock>
                <Block>
                    <Form>
                        <Text
                            fontSize="36"
                            fontWeight="bold"
                            color="#4C5151"
                            margin="10px 0px 5px 0px"
                            textAlign="left">
                            Create Job
                        </Text>
                        <Separator
                            margin="0px 0px 30px 0px"
                        />
                        <Wrapper
                            margin="0px"
                            width="70%"
                            display="block">
                            <Label>
                                Headline
                            </Label>
                            <Input
                                id="headline"
                                type="text"
                                value={form.headline}
                                onChange={(e) => typingHandler(e)}
                                placeholder="Headline"
                                name="headline"
                                required
                            />
                            <Text
                                fontSize="10"
                                fontWeight="300"
                                color="gray"
                                margin="0px"
                                textAlign="left">
                                *Write a title for your job pos
                            </Text>
                        </Wrapper>
                        <Wrapper
                            margin="18px 0px 0px 0px"
                            width="70%"
                            display="block">
                            <Label>
                                Duration of project
                            </Label>
                            <Input
                                type="date"
                                value={form.duration}
                                onChange={(e) => typingHandler(e)}
                                placeholder="Duration"
                                name="duration"
                                required
                            />
                            <Text
                                fontSize="10"
                                fontWeight="300"
                                color="gray"
                                margin="0px"
                                textAlign="left">
                                *Write how much time it takes to develop
                            </Text>
                        </Wrapper>
                        <Wrapper
                            margin="15px 0px 0px 0px"
                            width="30%"
                            display="block">
                            <Label>
                                Category
                            </Label>
                            <Select
                                value={form.category}
                                onChange={(e) => selectHandler(e)}>
                                {
                                    categories.map((item, i) =>
                                        <Option key={i}>{item}</Option>)
                                }
                            </Select>
                            <Text
                                fontSize="10"
                                fontWeight="300"
                                color="gray"
                                margin="0px"
                                textAlign="left">
                                *Choose a job category
                            </Text>
                        </Wrapper>
                        <Wrapper
                            margin="14px 0px 0px 0px"
                            width="70%"
                            display="block">
                            <Label>
                                Skills
                            </Label>
                            <Input
                                placeholder="Skills"
                                onChange={(e) => skillsHandler(e)}
                                type="text"
                                name="skills"
                            />
                            <Text
                                fontSize="10"
                                fontWeight="300"
                                color="gray"
                                margin="0px"
                                textAlign="left">
                                *Select the skills you expect from the performer
                            </Text>
                            <Wrapper
                                margin="8px 0px 0px 0px"
                                width="auto" display="block">
                                {
                                    customSkill
                                        ?
                                        <Button
                                            onClick={(e) => pickSkillHandler(e)}
                                            type="button"
                                            name={customSkill}
                                            margin="5px 0px 0px 5px"
                                            width="auto" height="30"
                                            color="white" background="#4C5151"
                                            fontSize="12"
                                            fontWeight="300">
                                            +{customSkill}
                                        </Button>
                                        :
                                        skills.map((item, i) => {
                                            return <Button
                                                onClick={(e) => pickSkillHandler(e)}
                                                type="button"
                                                name={item}
                                                key={i}
                                                margin="5px 0px 0px 5px"
                                                width="auto"
                                                height="30"
                                                color="white"
                                                background="#4C5151"
                                                fontSize="12"
                                                fontWeight="300">
                                                +{item}
                                            </Button>
                                        })}
                            </Wrapper>
                            <Wrapper
                                margin="10px 0px 0px 0px"
                                display="block"
                                width="100%">
                                <Text
                                    fontSize="12"
                                    fontWeight="400"
                                    color="gray"
                                    textAlign="left"
                                    margin="0px">
                                    *Picked
                                </Text>
                                {
                                    form.skills.length
                                        ?
                                        form.skills.map((item, i) => {
                                            return <Button
                                                onClick={(e) => pickSkillHandler(e)}
                                                type="button"
                                                name={item}
                                                key={i}
                                                margin="5px 0px 0px 5px"
                                                width="auto"
                                                height="30"
                                                color="white"
                                                background="green"
                                                fontSize="12"
                                                fontWeight="300">
                                                {item}
                                            </Button>
                                        })
                                        :
                                        <Text
                                            fontSize="10"
                                            fontWeight="200"
                                            color="gray"
                                            textAlign="center"
                                            margin="5px">
                                            Nothing selected :(
                                        </Text>}
                            </Wrapper>
                        </Wrapper>
                        <Wrapper
                            margin="14px 0px 0px 0px"
                            width="70%"
                            display="block">
                            <Label>
                                Hourly rate
                            </Label>
                            <Input
                                type="number"
                                value={form.rate}
                                onChange={(e) => typingHandler(e)}
                                placeholder="Rate"
                                name="rate"
                                required
                            />
                            <Text
                                fontSize="10"
                                fontWeight="300"
                                color="gray"
                                margin="0px"
                                textAlign="left">
                                *Enter how much you are willing to pay for the job
                            </Text>
                        </Wrapper>
                        <Wrapper
                            margin="14px 0px 0px 0px"
                            width="70%"
                            display="block">
                            <Label>
                                Description
                            </Label>
                            <TextArea
                                value={form.desc}
                                onChange={(e) => typingHandler(e)}
                                placeholder="Description"
                                name="desc"
                                required
                            />
                            <Text
                                fontSize="10"
                                fontWeight="300"
                                color="gray"
                                margin="0px"
                                textAlign="left">
                                *Write a detailed description of your order
                            </Text>
                        </Wrapper>
                        <Wrapper
                            margin="10px 0px 0px 0px"
                            width="100%"
                            display="flex">
                            <Button
                                type="submit"
                                fontSize="16"
                                fontWeight="bold"
                                color="white"
                                background="#75CCD2"
                                width="140"
                                height="40"
                                margin="0px">
                                Create
                            </Button>
                        </Wrapper>
                    </Form>
                </Block>
            </LeftBlock>
            <RightBlock>
                <Block>
                    <Wrapper
                        margin="10px auto"
                        width="100%"
                        display="block">
                        <Wrapper
                            display="flex"
                            margin="0px"
                            width="100%"
                            style={{ justifyContent: "center" }}>
                            <Image
                                src={Human}
                            />
                        </Wrapper>
                        <Text
                            fontSize="44"
                            fontWeight="bold"
                            color="white"
                            margin="0px"
                            textAlign="center">
                            Futurama
                        </Text>
                        <Text
                            fontSize="12"
                            fontWeight="300"
                            color="white"
                            margin="0px 0px 0px 140px"
                            textAlign="center">
                            Create your dream job!
                        </Text>
                    </Wrapper>
                    <Wrapper
                        margin="78% auto"
                        width="100%"
                        display="block">
                        <Text
                            fontSize="18"
                            fontWeight="bold"
                            color="white"
                            margin="0px"
                            textAlign="center">
                            Important!
                        </Text>
                        <Text
                            fontSize="14"
                            fontWeight="300"
                            color="white"
                            margin="10px 0px 0px 0px"
                            textAlign="center">
                            Welcome to the page for creating a vacancy,
                            please carefully fill in each field.
                            Fields marked with * are mandatory.
                        </Text>
                    </Wrapper>
                    <Wrapper
                        margin="0px"
                        display="block"
                        width="100%">
                        <Wrapper
                            margin="0px"
                            display="flex"
                            style={{ justifyContent: "end" }}
                            width="100%">
                            <Link to="/jobs">
                                <Text
                                    fontSize="12"
                                    fontWeight="300"
                                    color="white"
                                    margin="15px"
                                    textAlign="center">
                                    Jobs list
                                </Text>
                            </Link>
                            <Link to="/">
                                <Button
                                    type="button"
                                    fontSize="14"
                                    fontWeight="bold"
                                    color="white"
                                    background="#A6A7A7"
                                    width="120"
                                    height="40"
                                    margin="0px"
                                >
                                    Menu
                                </Button>
                            </Link>
                        </Wrapper>
                    </Wrapper>
                </Block>
            </RightBlock>
        </Content >
    );
};


