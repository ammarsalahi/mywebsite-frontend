
export interface User {
  id: number; // Django will have an auto-generated PK
  first_name?: string | null;
  last_name?: string | null;
  username: string;
  email: string;
  profile_image: string; // URL of the image
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
  is_verified: boolean;
  is_otp: boolean;
}

export interface Social {
  id: number; // from GeneralModel
  name: string;
  link: string;
  status?: string | null;
}

export interface Skill {
  id: number; // from GeneralModel
  name: string;
  status?: string | null;
}


export interface UserAbout {
  id: number; // from GeneralModel base
  user: User; // FK to User model
  description: string;
  english_description?: string | null;
  university_name: string;
  english_university_name?: string | null;
  university_web?: string | null;
  skills: Skill[]; // M2M relation
  socials: Social[]; // M2M relation
  fullname: string; // property
  user_img: string; // property (URL)
}

export interface Profile {
  id: number; // from GeneralModel
  user: User; // or number, depending on serializer
  otp_code?: string | null;
  qrcode_image?: string | null; // DRF will usually serialize ImageField as a URL
}

export interface Cooperation {
  id: number; // from GeneralModel
  types: string;
  name: string;
  project_name?: string | null;
  description?: string | null;
  website_image?: string | null; // serialized as URL by DRF
  email?: string | null;
  phone_number?: string | null;
}

export interface Category {
  id: number; // from GeneralModel
  name: string;
  english_name?: string | null;
  post_count: number; // computed property
}

export interface Image {
  id: number; // from GeneralModel
  img: string; // DRF will serialize ImageField as a URL
  state?: string | null;
}

export interface Keyword {
  id: number; // from GeneralModel
  name: string;
  english_name?: string | null;
}


export interface Post {
  id: number; // from GeneralModel
  post_id?: string | null;
  title: string;
  english_title?: string | null;
  header?: string | null;
  english_header?: string | null;
  header_image: string; // URL
  text?: string | null;
  english_text?: string | null;
  creator: User;
  view_count: number;
  keywords: Keyword[];
  category: Category;
  is_active: boolean;
  is_telegram_create: boolean;
  post_date: string; // computed property
  reading_time: string; // computed property
}

export interface Technology {
  id: number; // from GeneralModel
  name: string;
  english_name?: string | null;
}



export interface Project {
  id: number; // from GeneralModel
  project_id?: string | null;
  title: string;
  english_title?: string | null;
  header_image: string; // URL
  images: Image[];
  text?: string | null;
  english_text?: string | null;
  creator: User;
  technologies: Technology[];
  is_active: boolean;
  project_date: string; // computed property
  reading_time: string; // computed property
}

export interface TelegramRobot {
  id: number; // from GeneralModel
  robot_name: string;
  robot_token: string;
  type_robot: "post" | "project";
  is_active: boolean;
}


export interface TelegramChannel {
  id: number; // from GeneralModel
  channel_name: string;
  channel_id: string;
  channel_username: string;
  robot: TelegramRobot;
  type_channel: "post" | "project";
  is_active: boolean;
  get_robot_token?: string | null; // computed property
}
