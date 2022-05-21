import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CardWrapper, Header2, Header3, Header4 } from "pages/vacancies/styles";
import { useNavigate } from "react-router-dom";
//      import { NavLink } from 'react-router-dom';

interface IProps {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  englishLevel: string;
  price: number;

  // timePerWeek: number;
  // createdAt: string;
  // updatedAt: string;
}

export function Card({
  id,
  title,
  company,
  location,
  description,
  englishLevel,
  price,
}: // timePerWeek,
// createdAt,
// updatedAt,
IProps): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [chosen, setChosen] = useState({});
  const NEW = [
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
  ];

  function detailsClicker(id: number): void {
    let ghe = NEW.find((x) => x.id === id);

    if (ghe) {
      setChosen(ghe);
      navigate(`./${ghe.id}`);
    }
  }

  return (
    <>
      <div onClick={() => detailsClicker(id)}>
        <CardWrapper>
          <Header2>{title}</Header2>
          <Header3>
            {t("Vacancies.price")}
            {price}
          </Header3>
          <Header3>
            {t("Vacancies.company")}
            {company}
          </Header3>
          <Header3>
            {t("Vacancies.location")}
            {location}
          </Header3>
          <Header4>
            {t("Vacancies.englishLevel")}
            {englishLevel}
          </Header4>
          <Header4>{`${description
            .split(" ")
            .slice(0, 45)
            .join(" ")}...`}</Header4>
        </CardWrapper>
      </div>
    </>
  );
}
