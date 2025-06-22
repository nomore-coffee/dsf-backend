import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { MaterialService } from '../services/material.service';
import { CreateMaterialDto, UpdateMaterialDto } from '../dtos/material.dto';

@Controller('materials')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  create(@Body() dto: CreateMaterialDto) {
    return this.materialService.create(dto);
  }

  @Get()
  findAll() {
    return this.materialService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.materialService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMaterialDto) {
    return this.materialService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.materialService.delete(id);
  }

  @Get('user/:userID')
  findByUser(@Param('userID') userID: string) {
    return this.materialService.findByUser(userID);
  }

  @Get('org/:orgID')
  findByOrg(@Param('orgID') orgID: string) {
    return this.materialService.findByOrg(orgID);
  }

  @Get('class/:forClass')
  findByClass(@Param('forClass') forClass: number) {
    return this.materialService.findByClass(Number(forClass));
  }

  @Get('subject/:materialSubject')
  findBySubject(@Param('materialSubject') materialSubject: string) {
    return this.materialService.findBySubject(materialSubject);
  }
}
