import { fetchServices, insertServices } from "../services/workServices";
import { servicesSchema } from "../utils/zodSchemas";

export const insertServicesController = async (req: any, res: any) => {
  const parsed = servicesSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ Message: "Invalid input found.", data: parsed.error });
  }
  const { name, description, price, imageUrl, duration } = parsed.data;
  try {
    const response = await insertServices(
      name,
      description,
      duration,
      price,
      imageUrl
    );
    console.log(response);
    if (response) {
      res.status(201).json({ Message: "Service has successfully Added." });
    } else {
      res.status(500).json({ Message: "Unable to insert in Database." });
    }
  } catch (error) {
    res.status(500).status("Internal server error.");
  }
};

/*----------------fetch services controller----------------------*/
export const fetchServicesController = async (req: any, res: any) => {
  try {
    const response = await fetchServices();
   
    if (response) {
      res.status(200).json({
        Message: " Services list has been successfully fetched.",
        data: response,
      });
    } else {
      res.status(500).json({ Message: "Data is unable to retrieved." });
    }
  } catch (error) {
    res.status(500).json({ Message: "Internal server found." });
  }
};
