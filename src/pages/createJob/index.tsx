import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
const englishlevel: string[] = ["New", "strong"];
const defaultSkills: string[] = ["Account managment", "HTML", "CSS", "Analitycs skills", "Mysql", "Nodejs", "Python"];

export function CreateJob(): JSX.Element {
    const [skills, setSkills] = useState<string[]>(defaultSkills);
    const [customSkill, setCustomSkill] = useState<string>("");
    const { t } = useTranslation();
    const [form, setForm] = useState<FormInterface>({
        headline: '',
        duration: '',
        category: '',
        skills: [],
        englishlevel: '',
        location: '',
        rate: '',
        desc: '',
        company: ''
    });

    useEffect(() => {
        document.title = "Create job";
    }, []);

    function typingHandler(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    function selectHandler(event: ChangeEvent<HTMLSelectElement>): void {
        setForm({ ...form, [event.target.name]: event.target.value });
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
                            {t("createjob.headtext")}
                        </Text>
                        <Separator
                            margin="0px 0px 30px 0px"
                        />
                        <Wrapper
                            margin="0px"
                            width="70%"
                            display="block">
                            <Label>
                                {t("createjob.headline.label")}
                            </Label>
                            <Input
                                id="headline"
                                type="text"
                                value={form.headline}
                                onChange={(e) => typingHandler(e)}
                                placeholder={t("createjob.headline.label")}
                                name="headline"
                                required
                            />
                            <Text
                                fontSize="10"
                                fontWeight="300"
                                color="gray"
                                margin="0px"
                                textAlign="left">
                                *{t("createjob.headline.text")}
                            </Text>
                        </Wrapper>
                        <Wrapper
                            margin="18px 0px 0px 0px"
                            width="70%"
                            display="block">
                            <Label>
                                {t("createjob.duration.label")}
                            </Label>
                            <Input
                                type="date"
                                value={form.duration}
                                onChange={(e) => typingHandler(e)}
                                placeholder={t("createjob.duration.label")}
                                name="duration"
                                required
                            />
                            <Text
                                fontSize="10"
                                fontWeight="300"
                                color="gray"
                                margin="0px"
                                textAlign="left">
                                *{t("createjob.duration.text")}
                            </Text>
                        </Wrapper>
                        <Wrapper
                            margin="12px 0px 0px 0px"
                            width="70%"
                            display="flex"
                        >
                            <Wrapper
                                display="block"
                                width="35%"
                                margin="0px"
                            >
                                <Label>
                                    {t("createjob.category.label")}
                                </Label>
                                <Select
                                    value={form.category}
                                    name="category"
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
                                    *{t("createjob.category.text")}
                                </Text>
                            </Wrapper>
                            <Wrapper
                                display="block"
                                width="35%"
                                margin="0px 0px 0px 20px"
                            >
                                <Label>
                                    {t("createjob.english.label")}
                                </Label>
                                <Select
                                    value={form.englishlevel}
                                    name="englishlevel"
                                    onChange={(e) => selectHandler(e)}>
                                    {
                                        englishlevel.map((item, i) =>
                                            <Option key={i}>{item}</Option>)
                                    }
                                </Select>
                                <Text
                                    fontSize="10"
                                    fontWeight="300"
                                    color="gray"
                                    margin="0px"
                                    textAlign="left">
                                    *{t("createjob.english.text")}
                                </Text>
                            </Wrapper>
                        </Wrapper>
                        <Wrapper
                            margin="12px 0px 0px 0px"
                            width="70%"
                            display="block">
                            <Label>
                                {t("createjob.skills.label")}
                            </Label>
                            <Input
                                placeholder={t("createjob.skills.label")}
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
                                *{t("createjob.skills.text")}
                            </Text>
                            <Wrapper
                                margin="8px 0px 0px 0px"
                                width="auto" display="block">
                                {
                                    !customSkill ? <Text
                                        fontSize="12"
                                        fontWeight="400"
                                        color="gray"
                                        textAlign="left"
                                        margin="0px">
                                        {t("createjob.popular")}
                                    </Text> : null
                                }
                                {
                                    customSkill
                                        ?
                                        <Button
                                            onClick={(e) => pickSkillHandler(e)}
                                            type="button"
                                            name={customSkill}
                                            margin="5px 0px 0px 5px"
                                            width="auto"
                                            height="30"
                                            color="white"
                                            background="#4C5151"
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
                                    {t("createjob.picked")}
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
                                            {t("createjob.nothingMsg")} :(
                                        </Text>}
                            </Wrapper>
                        </Wrapper>
                        <Wrapper
                            margin="14px 0px 0px 0px"
                            width="70%"
                            display="block">
                            <Label>
                                {t("createjob.rate.label")}
                            </Label>
                            <Input
                                type="number"
                                value={form.rate}
                                onChange={(e) => typingHandler(e)}
                                placeholder={t("createjob.rate.label")}
                                name="rate"
                                required
                            />
                            <Text
                                fontSize="10"
                                fontWeight="300"
                                color="gray"
                                margin="0px"
                                textAlign="left">
                                *{t("createjob.rate.text")}
                            </Text>
                        </Wrapper>
                        <Wrapper
                            margin="14px 0px 0px 0px"
                            width="70%"
                            display="block">
                            <Label>
                                {t("createjob.location.label")}
                            </Label>
                            <Input
                                type="text"
                                value={form.rate}
                                onChange={(e) => typingHandler(e)}
                                placeholder={t("createjob.location.label")}
                                name="rate"
                                required
                            />
                            <Text
                                fontSize="10"
                                fontWeight="300"
                                color="gray"
                                margin="0px"
                                textAlign="left">
                                *{t("createjob.location.text")}
                            </Text>
                        </Wrapper>
                        <Wrapper
                            margin="14px 0px 0px 0px"
                            width="70%"
                            display="block">
                            <Label>
                                {t("createjob.company.label")}
                            </Label>
                            <Input
                                type="text"
                                value={form.rate}
                                onChange={(e) => typingHandler(e)}
                                placeholder={t("createjob.company.label")}
                                name="company"
                                required
                            />
                            <Text
                                fontSize="10"
                                fontWeight="300"
                                color="gray"
                                margin="0px"
                                textAlign="left">
                                *{t("createjob.company.text")}
                            </Text>
                        </Wrapper>
                        <Wrapper
                            margin="14px 0px 0px 0px"
                            width="70%"
                            display="block">
                            <Label>
                                {t("createjob.description.label")}
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
                                *{t("createjob.description.text")}
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
                                {t("createjob.createBtn")}
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
                        margin="100% auto"
                        width="100%"
                        display="block">
                        <Text
                            fontSize="18"
                            fontWeight="bold"
                            color="white"
                            margin="0px"
                            textAlign="center">
                            {t("createjob.important.label")}
                        </Text>
                        <Text
                            fontSize="14"
                            fontWeight="300"
                            color="white"
                            margin="10px 0px 0px 0px"
                            textAlign="center">
                            {t("createjob.important.text")}
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
                                    {t("createjob.joblist")}
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
                                    {t("createjob.home")}
                                </Button>
                            </Link>
                        </Wrapper>
                    </Wrapper>
                </Block>
            </RightBlock>
        </Content >
    );
};


