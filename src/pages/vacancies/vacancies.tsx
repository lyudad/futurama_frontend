/* eslint-disable max-len */
import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { fonts } from "constants/fonts";
import { colors } from "constants/colors";
import { Container, WorkField } from "./styles";
import { Card } from "./components/Card";

export function Vacancies(): JSX.Element {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  // eslint-disable-next-line no-unused-vars
  const [query, setQuery] = useState("");

  const onReset = (): void => {
    form.resetFields();
  };

  interface Ivalues {
    Search: string;
  }

  const onFinish = async (values: Ivalues): Promise<void> => {
    setQuery(values.Search);

    onReset();
  };

  const data = [
    {
        id: 1,
        category: "Development",
        owner: "Bob",
        title: "JS developer",
        description:
          "Знание CSS 2-3, HTML 4-5, Bootstrap 3-4; работа с REST API, AJAX; Опыт работы с JS, jQuery; умения работать с JS библиотеками; опыт использования GIT; работа с популярными CMS; умение работать в команде; умение разбираться в чужом коде; навык работы с Photoshop, Figma; оперативное реагирование и разрешение инцидентов.", 
          location: "Бишкек",
        company: "Эко исламик банк",
        englishLevel: "Intermediate",
        price: 400,
        timePerWeek: 40,
        createAt: "2022-05-13 23:34:55.178008",
        updateAt: "2022-05-13 01:34:55.178008",
      },
    {
      id: 2,
      category: "Development",
      owner: "Bob",
      title: "Dog",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, illum nulla possimus ea optio quisquam quae veritatis architecto reprehenderit pariatur mollitia, saepe, eos animi quasi enim non aspernatur dolorum odio vitae. Consectetur repellat tempora, laudantium eius dolore dolorem. Voluptatum quidem aut nam ipsum, dolor nostrum dolores atque distinctio commodi totam? Fugit hic dicta nam praesentium magni. Nemo non fugit saepe dolores, ducimus distinctio libero voluptates quibusdam! Facere blanditiis porro omnis pariatur sint beatae deserunt, cumque eveniet aspernatur! Impedit quaerat provident, velit sapiente consectetur quasi dolores quisquam, pariatur, commodi animi aspernatur quos doloribus repellat dicta voluptates ab? Iste harum, necessitatibus eos aut, at blanditiis, itaque repudiandae aperiam assumenda molestias inventore praesentium placeat molestiae ut nulla veniam non cupiditate officiis nisi animi. Vel ipsam, impedit dolor nostrum nemo dolorum temporibus reprehenderit omnis nisi necessitatibus a quia adipisci aut natus debitis cum, dignissimos quasi fuga veniam non eum eaque nesciunt? Reprehenderit eligendi ad sint exercitationem consectetur, iste iure cum officia mollitia accusantium ex rem, minus ea error corrupti! Ex, nihil molestias atque dolorem sed non soluta accusantium necessitatibus itaque odio distinctio at deserunt veniam vitae, natus molestiae? Recusandae modi eligendi incidunt porro perspiciatis quod repellendus accusantium aliquam molestias enim, quae minus unde similique totam tempore sequi tenetur possimus culpa illo quaerat nulla optio dolorem dicta quos? Voluptatibus quia adipisci doloremque laborum odio dolorem, culpa reprehenderit explicabo modi error nisi neque repellat earum iste. Dolor, architecto. Excepturi nulla assumenda aspernatur rerum, voluptatibus nihil fugit enim corrupti explicabo delectus deleniti soluta laudantium minima consequuntur distinctio, possimus aliquid veritatis. Ut sunt consequuntur deleniti vitae dolor! Aliquid voluptatum quidem enim consequatur corrupti dolor? Obcaecati molestiae corrupti necessitatibus quis, dignissimos architecto perferendis explicabo voluptas! Debitis, consequatur libero. Eveniet, incidunt veniam dolore temporibus ab itaque dolores modi consectetur necessitatibus quam vitae pariatur facilis, aperiam laborum eaque distinctio beatae! Debitis!",
      location: "Ukraine, Kyiv",
      company: "ZenBit",
      englishLevel: "Advanced",
      price: 1000,
      timePerWeek: 40,
      createAt: "2022-05-13 23:34:55.178008",
      updateAt: "2022-05-13 01:34:55.178008",
    },
    {
      id: 3,
      category: "Development",
      owner: "Bob",
      title: "Junior JS developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, illum nulla possimus ea optio quisquam quae veritatis architecto reprehenderit pariatur mollitia, saepe, eos animi quasi enim non aspernatur dolorum odio vitae. Consectetur repellat tempora, laudantium eius dolore dolorem. Voluptatum quidem aut nam ipsum, dolor nostrum dolores atque distinctio commodi totam? Fugit hic dicta nam praesentium magni. Nemo non fugit saepe dolores, ducimus distinctio libero voluptates quibusdam! Facere blanditiis porro omnis pariatur sint beatae deserunt, cumque eveniet aspernatur! Impedit quaerat provident, velit sapiente consectetur quasi dolores quisquam, pariatur, commodi animi aspernatur quos doloribus repellat dicta voluptates ab? Iste harum, necessitatibus eos aut, at blanditiis, itaque repudiandae aperiam assumenda molestias inventore praesentium placeat molestiae ut nulla veniam non cupiditate officiis nisi animi. Vel ipsam, impedit dolor nostrum nemo dolorum temporibus reprehenderit omnis nisi necessitatibus a quia adipisci aut natus debitis cum, dignissimos quasi fuga veniam non eum eaque nesciunt? Reprehenderit eligendi ad sint exercitationem consectetur, iste iure cum officia mollitia accusantium ex rem, minus ea error corrupti! Ex, nihil molestias atque dolorem sed non soluta accusantium necessitatibus itaque odio distinctio at deserunt veniam vitae, natus molestiae? Recusandae modi eligendi incidunt porro perspiciatis quod repellendus accusantium aliquam molestias enim, quae minus unde similique totam tempore sequi tenetur possimus culpa illo quaerat nulla optio dolorem dicta quos? Voluptatibus quia adipisci doloremque laborum odio dolorem, culpa reprehenderit explicabo modi error nisi neque repellat earum iste. Dolor, architecto. Excepturi nulla assumenda aspernatur rerum, voluptatibus nihil fugit enim corrupti explicabo delectus deleniti soluta laudantium minima consequuntur distinctio, possimus aliquid veritatis. Ut sunt consequuntur deleniti vitae dolor! Aliquid voluptatum quidem enim consequatur corrupti dolor? Obcaecati molestiae corrupti necessitatibus quis, dignissimos architecto perferendis explicabo voluptas! Debitis, consequatur libero. Eveniet, incidunt veniam dolore temporibus ab itaque dolores modi consectetur necessitatibus quam vitae pariatur facilis, aperiam laborum eaque distinctio beatae! Debitis!",
      location: "Ukraine, Kyiv",
      company: "ZenBit",
      englishLevel: "Advanced",
      price: 1000,
      timePerWeek: 40,
      createAt: "2022-05-13 23:34:55.178008",
      updateAt: "2022-05-13 01:34:55.178008",
    },

    {
      id: 6,
      category: "Development",
      owner: "Bob",
      title: "Водитель грузовика",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, illum nulla possimus ea optio quisquam quae veritatis architecto reprehenderit pariatur mollitia, saepe, eos animi quasi enim non aspernatur dolorum odio vitae. Consectetur repellat tempora, laudantium eius dolore dolorem. Voluptatum quidem aut nam ipsum, dolor nostrum dolores atque distinctio commodi totam? Fugit hic dicta nam praesentium magni. Nemo non fugit saepe dolores, ducimus distinctio libero voluptates quibusdam! Facere blanditiis porro omnis pariatur sint beatae deserunt, cumque eveniet aspernatur! Impedit quaerat provident, velit sapiente consectetur quasi dolores quisquam, pariatur, commodi animi aspernatur quos doloribus repellat dicta voluptates ab? Iste harum, necessitatibus eos aut, at blanditiis, itaque repudiandae aperiam assumenda molestias inventore praesentium placeat molestiae ut nulla veniam non cupiditate officiis nisi animi. Vel ipsam, impedit dolor nostrum nemo dolorum temporibus reprehenderit omnis nisi necessitatibus a quia adipisci aut natus debitis cum, dignissimos quasi fuga veniam non eum eaque nesciunt? Reprehenderit eligendi ad sint exercitationem consectetur, iste iure cum officia mollitia accusantium ex rem, minus ea error corrupti! Ex, nihil molestias atque dolorem sed non soluta accusantium necessitatibus itaque odio distinctio at deserunt veniam vitae, natus molestiae? Recusandae modi eligendi incidunt porro perspiciatis quod repellendus accusantium aliquam molestias enim, quae minus unde similique totam tempore sequi tenetur possimus culpa illo quaerat nulla optio dolorem dicta quos? Voluptatibus quia adipisci doloremque laborum odio dolorem, culpa reprehenderit explicabo modi error nisi neque repellat earum iste. Dolor, architecto. Excepturi nulla assumenda aspernatur rerum, voluptatibus nihil fugit enim corrupti explicabo delectus deleniti soluta laudantium minima consequuntur distinctio, possimus aliquid veritatis. Ut sunt consequuntur deleniti vitae dolor! Aliquid voluptatum quidem enim consequatur corrupti dolor? Obcaecati molestiae corrupti necessitatibus quis, dignissimos architecto perferendis explicabo voluptas! Debitis, consequatur libero. Eveniet, incidunt veniam dolore temporibus ab itaque dolores modi consectetur necessitatibus quam vitae pariatur facilis, aperiam laborum eaque distinctio beatae! Debitis!",
      location: "Ukraine, Kyiv",
      company: "ZenBit",
      englishLevel: "Advanced",
      price: 1000,
      timePerWeek: 40,
      createAt: "2022-05-13 23:34:55.178008",
      updateAt: "2022-05-13 01:34:55.178008",
    },
    {
      id: 7,
      category: "Development",
      owner: "Bob",
      title: "Junior KOTLIN developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, illum nulla possimus ea optio quisquam quae veritatis architecto reprehenderit pariatur mollitia, saepe, eos animi quasi enim non aspernatur dolorum odio vitae. Consectetur repellat tempora, laudantium eius dolore dolorem. Voluptatum quidem aut nam ipsum, dolor nostrum dolores atque distinctio commodi totam? Fugit hic dicta nam praesentium magni. Nemo non fugit saepe dolores, ducimus distinctio libero voluptates quibusdam! Facere blanditiis porro omnis pariatur sint beatae deserunt, cumque eveniet aspernatur! Impedit quaerat provident, velit sapiente consectetur quasi dolores quisquam, pariatur, commodi animi aspernatur quos doloribus repellat dicta voluptates ab? Iste harum, necessitatibus eos aut, at blanditiis, itaque repudiandae aperiam assumenda molestias inventore praesentium placeat molestiae ut nulla veniam non cupiditate officiis nisi animi. Vel ipsam, impedit dolor nostrum nemo dolorum temporibus reprehenderit omnis nisi necessitatibus a quia adipisci aut natus debitis cum, dignissimos quasi fuga veniam non eum eaque nesciunt? Reprehenderit eligendi ad sint exercitationem consectetur, iste iure cum officia mollitia accusantium ex rem, minus ea error corrupti! Ex, nihil molestias atque dolorem sed non soluta accusantium necessitatibus itaque odio distinctio at deserunt veniam vitae, natus molestiae? Recusandae modi eligendi incidunt porro perspiciatis quod repellendus accusantium aliquam molestias enim, quae minus unde similique totam tempore sequi tenetur possimus culpa illo quaerat nulla optio dolorem dicta quos? Voluptatibus quia adipisci doloremque laborum odio dolorem, culpa reprehenderit explicabo modi error nisi neque repellat earum iste. Dolor, architecto. Excepturi nulla assumenda aspernatur rerum, voluptatibus nihil fugit enim corrupti explicabo delectus deleniti soluta laudantium minima consequuntur distinctio, possimus aliquid veritatis. Ut sunt consequuntur deleniti vitae dolor! Aliquid voluptatum quidem enim consequatur corrupti dolor? Obcaecati molestiae corrupti necessitatibus quis, dignissimos architecto perferendis explicabo voluptas! Debitis, consequatur libero. Eveniet, incidunt veniam dolore temporibus ab itaque dolores modi consectetur necessitatibus quam vitae pariatur facilis, aperiam laborum eaque distinctio beatae! Debitis!",
      location: "Ukraine, Kyiv",
      company: "ZenBit",
      englishLevel: "Advanced",
      price: 1000,
      timePerWeek: 40,
      createAt: "2022-05-13 23:34:55.178008",
      updateAt: "2022-05-13 01:34:55.178008",
    },
    {
      id: 8,
      category: "Development",
      owner: "Bob",
      title: "C++ developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, illum nulla possimus ea optio quisquam quae veritatis architecto reprehenderit pariatur mollitia, saepe, eos animi quasi enim non aspernatur dolorum odio vitae. Consectetur repellat tempora, laudantium eius dolore dolorem. Voluptatum quidem aut nam ipsum, dolor nostrum dolores atque distinctio commodi totam? Fugit hic dicta nam praesentium magni. Nemo non fugit saepe dolores, ducimus distinctio libero voluptates quibusdam! Facere blanditiis porro omnis pariatur sint beatae deserunt, cumque eveniet aspernatur! Impedit quaerat provident, velit sapiente consectetur quasi dolores quisquam, pariatur, commodi animi aspernatur quos doloribus repellat dicta voluptates ab? Iste harum, necessitatibus eos aut, at blanditiis, itaque repudiandae aperiam assumenda molestias inventore praesentium placeat molestiae ut nulla veniam non cupiditate officiis nisi animi. Vel ipsam, impedit dolor nostrum nemo dolorum temporibus reprehenderit omnis nisi necessitatibus a quia adipisci aut natus debitis cum, dignissimos quasi fuga veniam non eum eaque nesciunt? Reprehenderit eligendi ad sint exercitationem consectetur, iste iure cum officia mollitia accusantium ex rem, minus ea error corrupti! Ex, nihil molestias atque dolorem sed non soluta accusantium necessitatibus itaque odio distinctio at deserunt veniam vitae, natus molestiae? Recusandae modi eligendi incidunt porro perspiciatis quod repellendus accusantium aliquam molestias enim, quae minus unde similique totam tempore sequi tenetur possimus culpa illo quaerat nulla optio dolorem dicta quos? Voluptatibus quia adipisci doloremque laborum odio dolorem, culpa reprehenderit explicabo modi error nisi neque repellat earum iste. Dolor, architecto. Excepturi nulla assumenda aspernatur rerum, voluptatibus nihil fugit enim corrupti explicabo delectus deleniti soluta laudantium minima consequuntur distinctio, possimus aliquid veritatis. Ut sunt consequuntur deleniti vitae dolor! Aliquid voluptatum quidem enim consequatur corrupti dolor? Obcaecati molestiae corrupti necessitatibus quis, dignissimos architecto perferendis explicabo voluptas! Debitis, consequatur libero. Eveniet, incidunt veniam dolore temporibus ab itaque dolores modi consectetur necessitatibus quam vitae pariatur facilis, aperiam laborum eaque distinctio beatae! Debitis!",
      location: "Ukraine, Kyiv",
      company: "ZenBit",
      englishLevel: "Advanced",
      price: 1000,
      timePerWeek: 40,
      createAt: "2022-05-13 23:34:55.178008",
      updateAt: "2022-05-13 01:34:55.178008",
    },
  ];

  return (
    <Container>
      <WorkField>
        <Form
          name="basic"
          form={form}
          layout="vertical"
          labelCol={{ span: 8 }}
          initialValues={{ remember: false }}
          onFinish={onFinish}
          autoComplete="on"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <Form.Item
            name="Search"
            rules={[
              {
                required: true,
                message: t("Vacancies.placeholder"),
              },
            ]}
          >
            <Input
              style={{
                height: "50px",
                width: "450px",
                borderRadius: "20px",
                border: "1px solid #808080",
                marginRight: "16px",
                fontSize: fonts.FONT_SIZE_LABELS,
                boxShadow:
                  "0px 2px 6px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.14),0px 2px 6px rgba(0, 0, 0, 0.2)",
              }}
              placeholder={t("Vacancies.searchField")}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "150px",
                height: "50px",
                borderRadius: "20px",
                border: "none",
                background: colors.BUTTON_COLOR_BASE,
                fontSize: fonts.FONT_SIZE_BUTTONS,
                textTransform: "uppercase",
                boxShadow:
                  "0px 2px 6px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.14),0px 2px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              {t("Vacancies.searchBtn")}
            </Button>
          </Form.Item>
        </Form>
        {data.map((el) => (
            
          <Card
         
            key={el.id}
            id={el.id}
            title={el.title}
            company={el.company}
            location={el.location}
            description={el.description}
            englishLevel={el.englishLevel}
            price={el.price}
            // timePerWeek={el.timePerWeek}
            // createdAt={el.createAt}
            // updatedAt={el.updateAt}
          />
        ))}
      </WorkField>
    </Container>
  );
}
